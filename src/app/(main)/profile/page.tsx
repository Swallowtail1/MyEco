import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import ProfileBadges from "@/components/profile/ProfileBadges";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileRecentActivities from "@/components/profile/ProfileRecentActivities";
import EcoLevelCard from "@/components/dashboard/EcoLevelCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
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

export default async function ProfilePage() {
  const supabase = await createClient();

  type UserBadge = {
    id: string;
    earned_at: string;
    badges: {
      name: string;
      description: string | null;
      icon: string | null;
      required_points: number;
    } | null;
  };

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
      avatar_url,
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

  const { count: totalActivities } = await supabase
    .from("user_activities")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  const { count: completedChallenges } = await supabase
    .from("user_challenges")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id)
    .eq("status", "completed");

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

  const { data: userBadgesData } = await supabase
    .from("user_badges")
    .select(
      `
    id,
    earned_at,
    badges (
      name,
      description,
      icon,
      required_points
    )
  `,
    )
    .eq("user_id", user.id)
    .order("earned_at", {
      ascending: false,
    });

  const userBadges: UserBadge[] =
    userBadgesData?.map((item) => {
      const badge = Array.isArray(item.badges) ? item.badges[0] : item.badges;

      return {
        id: item.id,
        earned_at: item.earned_at,
        badges: badge
          ? {
              name: badge.name,
              description: badge.description,
              icon: badge.icon,
              required_points: Number(badge.required_points ?? 0),
            }
          : null,
      };
    }) ?? [];

  const currentBadge =
    userBadges
      .filter((item) => item.badges)
      .sort(
        (a, b) =>
          (b.badges?.required_points ?? 0) - (a.badges?.required_points ?? 0),
      )[0]?.badges?.name ?? "Seedling";

  return (
    <div className="space-y-8">
      <ProfileHeader
        userId={user.id}
        username={profile.username}
        campus={profile.campus}
        avatarUrl={profile.avatar_url}
      />

      <ProfileStats
        ecoPoints={Number(profile.eco_points ?? 0)}
        carbonSaved={Number(profile.carbon_saved ?? 0)}
        streak={Number(profile.streak ?? 0)}
        totalActivities={totalActivities ?? 0}
        completedChallenges={completedChallenges ?? 0}
        currentBadge={currentBadge}
      />

      <EcoLevelCard points={profile?.eco_points ?? 0} />

      <ProfileBadges badges={userBadges} />

      <ProfileRecentActivities activities={recentActivities} />
    </div>
  );
}
