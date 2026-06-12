import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Leaf } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import EcoLevelCard from "@/components/dashboard/EcoLevelCard";
import EcoImpactCard from "@/components/dashboard/EcoImpactCard";
import ProfileBadges from "@/components/profile/ProfileBadges";
import ProfileRecentActivities from "@/components/profile/ProfileRecentActivities";

type PublicProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const decodedUsername = decodeURIComponent(username);

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      `
      id,
      username,
      campus,
      avatar_url,
      eco_points,
      carbon_saved,
      streak,
      onboarding_completed
    `,
    )
    .eq("username", decodedUsername)
    .eq("onboarding_completed", true)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

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
    .eq("user_id", profile.id)
    .order("earned_at", {
      ascending: false,
    });

  const userBadges =
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
    .eq("user_id", profile.id)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  const recentActivities =
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

  return (
    <main className="min-h-screen bg-[#071018] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Leaderboard
        </Link>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="h-28 w-28 overflow-hidden rounded-full border border-green-400/30 bg-green-400/10">
                {profile.avatar_url?.startsWith("http") ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.username ?? "User Avatar"}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-green-400">
                    {profile.username?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm text-green-400">
                  <Leaf size={14} />
                  Public Eco Profile
                </div>

                <h1 className="text-3xl font-black md:text-5xl">
                  {profile.username}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span>{profile.campus ?? "No campus"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-green-400">
                  {Number(profile.eco_points ?? 0)}
                </p>
                <p className="mt-1 text-xs text-gray-400">Points</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-cyan-400">
                  {Number(profile.carbon_saved ?? 0).toFixed(1)}
                </p>
                <p className="mt-1 text-xs text-gray-400">kg CO₂</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-yellow-400">
                  {Number(profile.streak ?? 0)}
                </p>
                <p className="mt-1 text-xs text-gray-400">Streak</p>
              </div>
            </div>
          </div>
        </section>

        <EcoLevelCard points={Number(profile.eco_points ?? 0)} />

        <EcoImpactCard carbonSaved={Number(profile.carbon_saved ?? 0)} />

        <ProfileBadges badges={userBadges} />

        <ProfileRecentActivities
          activities={recentActivities}
          showAddButton={false}
        />
      </div>
    </main>
  );
}
