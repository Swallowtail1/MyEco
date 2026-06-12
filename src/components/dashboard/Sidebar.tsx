"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Leaf,
  Trophy,
  BarChart3,
  User,
} from "lucide-react";

const menus = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Activities",
    href: "/activities",
    icon: Leaf,
  },
  {
    label: "Challenges",
    href: "/challenges",
    icon: Trophy,
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    icon: BarChart3,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:sticky lg:top-0 lg:flex h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-400">
          MyEco 🌱
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Carbon Footprint Tracker
        </p>
      </div>

      <nav className="px-4 space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-green-400 text-black font-semibold shadow-[0_0_30px_rgba(74,222,128,0.25)]"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}