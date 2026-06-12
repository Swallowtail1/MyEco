import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import ActivitiesClient from "@/components/activities/ActivitiesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities",
};

export default async function ActivitiesPage() {
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

  const { data: categories } = await supabase
    .from("activity_categories")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  const { data: activities } = await supabase
    .from("user_activities")
    .select(`
      id,
      notes,
      carbon_saved,
      points_earned,
      created_at,
      activity_categories (
        name,
        icon
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  const formattedActivities =
    activities?.map((activity) => {
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

  return (
    <ActivitiesClient
      categories={categories ?? []}
      activities={formattedActivities}
    />
  );
}