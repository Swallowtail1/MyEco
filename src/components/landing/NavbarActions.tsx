"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogIn } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function NavbarActions() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="hidden md:block h-10 w-28 rounded-xl bg-white/10 animate-pulse" />
    );
  }

  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className="hidden md:inline-flex items-center gap-2 rounded-xl bg-green-400 px-4 py-2 font-semibold text-black transition hover:scale-[1.02]"
      >
        <LayoutDashboard size={17} />
        Dashboard
      </Link>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-3">
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
      >
        <LogIn size={17} />
        Login
      </Link>

      <Link
        href="/register"
        className="rounded-xl bg-green-400 px-4 py-2 font-semibold text-black transition hover:scale-[1.02]"
      >
        Register
      </Link>
    </div>
  );
}