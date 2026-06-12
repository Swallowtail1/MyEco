import { createClient } from "./supabase/client";

const supabase = createClient();

export async function logout() {
  await supabase.auth.signOut();

  window.location.href = "/";
}