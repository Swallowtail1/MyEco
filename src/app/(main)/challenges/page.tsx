import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import ChallengesClient from "@/components/challenges/ChallengesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges",
};

type UserStatus = "not_joined" | "joined" | "completed";

type Challenge = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  reward_points: number;
  carbon_reward: number;
  start_date: string | null;
  end_date: string | null;
  target_count: number;
  progress_count: number;
  target_category_name: string | null;
};

type UserChallenge = {
  challenge_id: string;
  status: string;
};

export default async function ChallengesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed, eco_points, carbon_saved")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_completed) {
    redirect("/onboarding");
  }

  const { data: challenges } = await supabase
    .from("challenges")
    .select(
      `
    id,
    title,
    description,
    icon,
    reward_points,
    carbon_reward,
    start_date,
    end_date,
    target_category_id,
    target_count,
    activity_categories (
      name
    )
  `,
    )
    .order("created_at", {
      ascending: false,
    });

  const { data: userActivities } = await supabase
    .from("user_activities")
    .select("category_id, created_at")
    .eq("user_id", user.id);

  const { data: userChallenges } = await supabase
    .from("user_challenges")
    .select("challenge_id, status, joined_at, completed_at")
    .eq("user_id", user.id);

  const formattedChallenges =
    challenges?.map((challenge) => {
      const joinedChallenge = userChallenges?.find(
        (item) => item.challenge_id === challenge.id,
      );

      let userStatus: "not_joined" | "joined" | "completed" = "not_joined";

      if (joinedChallenge?.status === "completed") {
        userStatus = "completed";
      } else if (joinedChallenge?.status === "joined") {
        userStatus = "joined";
      }

      const category = Array.isArray(challenge.activity_categories)
        ? challenge.activity_categories[0]
        : challenge.activity_categories;

      const targetCount = Number(challenge.target_count ?? 1);

      const joinedAt = joinedChallenge?.joined_at
        ? new Date(joinedChallenge.joined_at).getTime()
        : null;

      const rawProgressCount =
        joinedAt === null
          ? 0
          : (userActivities?.filter((activity) => {
              const activityTime = new Date(activity.created_at).getTime();

              return (
                activity.category_id === challenge.target_category_id &&
                activityTime >= joinedAt
              );
            }).length ?? 0);

      const progressCount =
        userStatus === "completed"
          ? targetCount
          : Math.min(rawProgressCount, targetCount);

      return {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        icon: challenge.icon,
        reward_points: Number(challenge.reward_points ?? 0),
        carbon_reward: Number(challenge.carbon_reward ?? 0),
        start_date: challenge.start_date,
        end_date: challenge.end_date,
        user_status: userStatus,

        target_count: targetCount,
        progress_count: progressCount,
        target_category_name: category?.name ?? null,
      };
    }) ?? [];

  return (
    <ChallengesClient
      challenges={formattedChallenges}
      userId={user.id}
      profile={{
        eco_points: Number(profile.eco_points ?? 0),
        carbon_saved: Number(profile.carbon_saved ?? 0),
      }}
    />
  );
}
