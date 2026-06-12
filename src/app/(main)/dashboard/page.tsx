import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import WeeklyProgressChart from "@/components/dashboard/WeeklyProgressChart";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import ActiveChallenges from "@/components/dashboard/ActiveChallenges";
import LeaderboardPreview from "@/components/dashboard/LeaderboardPreview";
import EcoLevelCard from "@/components/dashboard/EcoLevelCard";
import EcoImpactCard from "@/components/dashboard/EcoImpactCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

type WeeklyProgress = {
  day: string;
  points: number;
  carbon: number;
};

type RecentActivity = {
  id: string;
  notes: string | null;
  carbon_saved: number;
  points_earned: number;
  created_at: string;
  activity_categories: {
    name: string;
    icon: string | null;
  } | null;
};

type ActiveChallenge = {
  id: string;
  status: string;
  joined_at: string;
  challenges: {
    title: string;
    description: string | null;
    icon: string | null;
    reward_points: number;
    carbon_reward: number;
  } | null;
};

type LeaderboardUser = {
  id: string;
  username: string | null;
  campus: string | null;
  avatar_url: string | null;
  eco_points: number;
  streak: number;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      `
      username,
      campus,
      eco_points,
      carbon_saved,
      streak,
      onboarding_completed
    `,
    )
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_completed) {
    redirect("/onboarding");
  }

  const { data: recentActivitiesData } = await supabase
    .from("user_activities")
    .select(
      `
      id,
      notes,
      carbon_saved,
      points_earned,
      created_at,
      activity_categories (
        name,
        icon
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  const recentActivities: RecentActivity[] =
    recentActivitiesData?.map((activity) => {
      const category = Array.isArray(activity.activity_categories)
        ? activity.activity_categories[0]
        : activity.activity_categories;

      return {
        id: activity.id,
        notes: activity.notes,
        carbon_saved: Number(activity.carbon_saved ?? 0),
        points_earned: Number(activity.points_earned ?? 0),
        created_at: activity.created_at,
        activity_categories: category
          ? {
              name: category.name,
              icon: category.icon,
            }
          : null,
      };
    }) ?? [];

  const { data: activeChallengesData } = await supabase
    .from("user_challenges")
    .select(
      `
      id,
      status,
      joined_at,
      challenges (
        title,
        description,
        icon,
        reward_points,
        carbon_reward
      )
    `,
    )
    .eq("user_id", user.id)
    .eq("status", "joined")
    .order("joined_at", {
      ascending: false,
    })
    .limit(3);

  const activeChallenges: ActiveChallenge[] =
    activeChallengesData?.map((item) => {
      const challenge = Array.isArray(item.challenges)
        ? item.challenges[0]
        : item.challenges;

      return {
        id: item.id,
        status: item.status,
        joined_at: item.joined_at,
        challenges: challenge
          ? {
              title: challenge.title,
              description: challenge.description,
              icon: challenge.icon,
              reward_points: Number(challenge.reward_points ?? 0),
              carbon_reward: Number(challenge.carbon_reward ?? 0),
            }
          : null,
      };
    }) ?? [];

  const { data: leaderboardData } = await supabase
    .from("profiles")
    .select(
      `
      id,
      username,
      campus,
      avatar_url,
      eco_points,
      streak
    `,
    )
    .eq("onboarding_completed", true)
    .order("eco_points", {
      ascending: false,
    })
    .limit(5);

  const leaderboardUsers: LeaderboardUser[] =
    leaderboardData?.map((item) => ({
      id: item.id,
      username: item.username,
      campus: item.campus,
      avatar_url: item.avatar_url,
      eco_points: Number(item.eco_points ?? 0),
      streak: Number(item.streak ?? 0),
    })) ?? [];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const { data: weeklyActivitiesData } = await supabase
    .from("user_activities")
    .select("points_earned, carbon_saved, created_at")
    .eq("user_id", user.id)
    .gte("created_at", sevenDaysAgo.toISOString());

  const weeklyMap = new Map<
    string,
    {
      points: number;
      carbon: number;
    }
  >();

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const key = date.toLocaleDateString("id-ID", {
      weekday: "short",
    });

    weeklyMap.set(key, {
      points: 0,
      carbon: 0,
    });
  }

  weeklyActivitiesData?.forEach((activity) => {
    const key = new Date(activity.created_at).toLocaleDateString("id-ID", {
      weekday: "short",
    });

    const current = weeklyMap.get(key);

    if (!current) return;

    weeklyMap.set(key, {
      points: current.points + Number(activity.points_earned ?? 0),
      carbon: current.carbon + Number(activity.carbon_saved ?? 0),
    });
  });

  const weeklyProgress: WeeklyProgress[] = Array.from(weeklyMap.entries()).map(
    ([day, value]) => ({
      day,
      points: value.points,
      carbon: value.carbon,
    }),
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {profile?.username ?? "Eco Warrior"}!
        </h1>

        <p className="text-gray-400 mt-1">
          Continue your eco journey and make today greener.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Eco Points"
          value={String(profile?.eco_points ?? 0)}
          subtitle="Total collected points"
        />

        <StatCard
          title="Carbon Saved"
          value={`${profile?.carbon_saved ?? 0} kg`}
          subtitle="CO₂ impact reduced"
        />

        <StatCard
          title="Current Streak"
          value={String(profile?.streak ?? 0)}
          subtitle="Day streak"
        />

        <StatCard
          title="Campus"
          value={profile?.campus ?? "-"}
          subtitle="Your eco community"
        />
      </div>

      <EcoLevelCard points={profile?.eco_points ?? 0} />

      <WeeklyProgressChart data={weeklyProgress} />

      <EcoImpactCard carbonSaved={Number(profile.carbon_saved ?? 0)} />

      <div className="grid xl:grid-cols-2 gap-6">
        <RecentActivities activities={recentActivities} />

        <ActiveChallenges challenges={activeChallenges} />
      </div>

      <LeaderboardPreview users={leaderboardUsers} currentUserId={user.id} />
    </div>
  );
}
