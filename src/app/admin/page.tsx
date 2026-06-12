import {
  Users,
  Trophy,
  Leaf,
  Activity,
  Cloud,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import AdminStatCard from "@/components/admin/AdminStatCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Overviews",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: totalChallenges } = await supabase
    .from("challenges")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: totalCategories } = await supabase
    .from("activity_categories")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: totalActivities } = await supabase
    .from("user_activities")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { data: carbonData } = await supabase
    .from("profiles")
    .select("carbon_saved");

  const totalCarbonSaved =
    carbonData?.reduce((total, item) => {
      return total + Number(item.carbon_saved ?? 0);
    }, 0) ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">
          Admin Overview
        </h1>

        <p className="mt-2 text-gray-400">
          Monitor EcoTrack data and manage app content.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          label="Total Users"
          value={totalUsers ?? 0}
          icon={Users}
        />

        <AdminStatCard
          label="Challenges"
          value={totalChallenges ?? 0}
          icon={Trophy}
        />

        <AdminStatCard
          label="Categories"
          value={totalCategories ?? 0}
          icon={Leaf}
        />

        <AdminStatCard
          label="Activities"
          value={totalActivities ?? 0}
          icon={Activity}
        />

        <AdminStatCard
          label="CO₂ Saved"
          value={`${totalCarbonSaved.toFixed(1)} kg`}
          icon={Cloud}
        />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white">
          Quick Actions
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Manage challenges and activity categories from the admin panel.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/admin/challenges"
            className="rounded-xl bg-green-400 px-5 py-3 text-center font-semibold text-black transition hover:scale-[1.02]"
          >
            Manage Challenges
          </a>

          <a
            href="/admin/categories"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center font-semibold text-white transition hover:bg-white/10"
          >
            Manage Categories
          </a>
        </div>
      </div>
    </div>
  );
}