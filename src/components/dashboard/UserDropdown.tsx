"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronDown, LogOut, User, Shield } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type UserDropdownProps = {
  username: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
};

export default function UserDropdown({
  username,
  avatarUrl,
  isAdmin,
}: UserDropdownProps) {
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden bg-green-400/10 border border-green-400/20">
          {avatarUrl?.startsWith("http") ? (
            <Image
              src={avatarUrl}
              alt={username ?? "User Avatar"}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-green-400 font-bold">
              {username?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}
        </div>

        <span className="hidden md:block text-white text-sm font-medium">
          {username ?? "User"}
        </span>

        <ChevronDown
          size={16}
          className={`text-gray-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#0b1720] border border-white/10 shadow-2xl overflow-hidden z-50">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            <User size={17} />
            Profile
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              <Shield size={17} />
              Admin Panel
            </Link>
          )}

          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
          >
            <LogOut size={17} />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
