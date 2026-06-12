import { createClient } from "@/lib/supabase/server";
import AdminUsersClient from "@/components/admin/users/AdminUsersClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Users",
};

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from("profiles")
    .select(
      `
      id,
      email,
      username,
      campus,
      avatar_url,
      role,
      eco_points,
      carbon_saved,
      streak,
      onboarding_completed,
      created_at
    `
    )
    .order("created_at", {
      ascending: false,
    });

  const formattedUsers =
    users?.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      campus: user.campus,
      avatar_url: user.avatar_url,
      role: user.role ?? "user",
      eco_points: Number(user.eco_points ?? 0),
      carbon_saved: Number(user.carbon_saved ?? 0),
      streak: Number(user.streak ?? 0),
      onboarding_completed: Boolean(user.onboarding_completed),
      created_at: user.created_at,
    })) ?? [];

  return <AdminUsersClient users={formattedUsers} />;
}