import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BarChart3 } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import TopThreeCard from "@/components/leaderboard/TopThreeCard";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
};

type LeaderboardUser = {
  id: string;
  username: string | null;
  campus: string | null;
  avatar_url: string | null;
  eco_points: number;
  carbon_saved: number;
  streak: number;
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_completed) {
    redirect("/onboarding");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      username,
      campus,
      avatar_url,
      eco_points,
      carbon_saved,
      streak
    `,
    )
    .eq("onboarding_completed", true)
    .order("eco_points", {
      ascending: false,
    })
    .limit(50);

  if (error) {
    console.error(error);
  }

  const users: LeaderboardUser[] =
    data?.map((item) => ({
      id: item.id,
      username: item.username,
      campus: item.campus,
      avatar_url: item.avatar_url,
      eco_points: Number(item.eco_points ?? 0),
      carbon_saved: Number(item.carbon_saved ?? 0),
      streak: Number(item.streak ?? 0),
    })) ?? [];

  const topThree = users.slice(0, 3);

  if (users.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Leaderboard</h1>

          <p className="mt-1 text-gray-400">
            See who creates the biggest positive impact.
          </p>
        </div>

        <EmptyState
          icon={BarChart3}
          title="No leaderboard data yet"
          description="Once users complete onboarding and collect eco points, their ranking will appear here."
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>

        <p className="text-gray-400 mt-1">
          Compete with others and become the top eco warrior.
        </p>
      </div>

      {topThree.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-6 items-end">
          {topThree.map((leader, index) => (
            <TopThreeCard key={leader.id} user={leader} rank={index + 1} />
          ))}
        </div>
      )}

      <LeaderboardTable users={users} currentUserId={user.id} />
    </div>
  );
}
