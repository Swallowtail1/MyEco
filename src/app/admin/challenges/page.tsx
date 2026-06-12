import { createClient } from "@/lib/supabase/server";
import AdminChallengesClient from "@/components/admin/challenges/AdminChallengesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Challenges",
};

export default async function AdminChallengesPage() {
  const supabase = await createClient();

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
      created_at,
      activity_categories (
        name
      )
    `
    )
    .order("created_at", {
      ascending: false,
    });

  const { data: categories } = await supabase
    .from("activity_categories")
    .select("id, name")
    .order("name", {
      ascending: true,
    });

  const formattedChallenges =
    challenges?.map((challenge) => {
      const category = Array.isArray(challenge.activity_categories)
        ? challenge.activity_categories[0]
        : challenge.activity_categories;

      return {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        icon: challenge.icon,
        reward_points: Number(challenge.reward_points ?? 0),
        carbon_reward: Number(challenge.carbon_reward ?? 0),
        start_date: challenge.start_date,
        end_date: challenge.end_date,
        target_category_id: challenge.target_category_id,
        target_count: Number(challenge.target_count ?? 1),
        target_category_name: category?.name ?? null,
      };
    }) ?? [];

  return (
    <AdminChallengesClient
      challenges={formattedChallenges}
      categories={categories ?? []}
    />
  );
}