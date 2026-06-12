import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AuthRedirectPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, role, onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      onboarding_completed: false,
      role: "user",
    });

    redirect("/onboarding");
  }

  if (!profile.onboarding_completed) {
    redirect("/onboarding");
  }

  if (profile.role === "admin") {
    redirect("/admin");
  }

  redirect("/dashboard");
}