"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, LayoutDashboard, LogIn } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function LandingActions() {
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
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-12 w-40 rounded-xl bg-green-400/20 animate-pulse" />
        <div className="h-12 w-32 rounded-xl bg-white/10 animate-pulse" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
        >
          <LayoutDashboard size={18} />
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        href="/register"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
      >
        Get Started
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}