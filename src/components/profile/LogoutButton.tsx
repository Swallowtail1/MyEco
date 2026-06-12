"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <LogOut size={18} />
      )}

      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}