import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, avatar_url, onboarding_completed, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/onboarding");
  }

  if (!profile.onboarding_completed) {
    redirect("/onboarding");
  }

  return (
    <DashboardShell
      username={profile.username}
      avatarUrl={profile.avatar_url}
      isAdmin={profile.role === "admin"}
    >
      {children}
    </DashboardShell>
  );
}