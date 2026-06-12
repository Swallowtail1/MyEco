import { createClient } from "@/lib/supabase/server";
import AdminBadgesClient from "@/components/admin/badges/AdminBadgesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Badges",
};

export default async function AdminBadgesPage() {
  const supabase = await createClient();

  const { data: badges } = await supabase
    .from("badges")
    .select(
      `
      id,
      name,
      description,
      icon,
      required_points,
      created_at
    `
    )
    .order("required_points", {
      ascending: true,
    });

  const formattedBadges =
    badges?.map((badge) => ({
      id: badge.id,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      required_points: Number(badge.required_points ?? 0),
      created_at: badge.created_at,
    })) ?? [];

  return <AdminBadgesClient badges={formattedBadges} />;
}