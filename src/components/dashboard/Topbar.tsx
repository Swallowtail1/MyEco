"use client";

import { Bell } from "lucide-react";
import UserDropdown from "./UserDropdown";

type TopbarProps = {
  username: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
};

export default function Topbar({ username, avatarUrl, isAdmin }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 h-20 border-b border-white/10 bg-[#071018]/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
      <div>
        <h2 className="text-white text-lg sm:text-xl font-semibold">
          MyEco
        </h2>

        <p className="text-gray-500 text-sm hidden sm:block">
          Track your progress, challenges, and eco impact.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition">
          <Bell size={18} />
        </button>

        <UserDropdown
          username={username}
          avatarUrl={avatarUrl}
          isAdmin={isAdmin}
        />
      </div>
    </header>
  );
}
