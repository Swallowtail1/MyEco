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
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/activities",
    icon: Leaf,
  },
  {
    href: "/challenges",
    icon: Trophy,
  },
  {
    href: "/leaderboard",
    icon: BarChart3,
  },
  {
    href: "/profile",
    icon: User,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#071018]/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center z-50">
      {menus.map((item) => {
        const Icon = item.icon;

        const isActive =
          pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition ${
              isActive
                ? "bg-green-400 text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Icon size={21} />
          </Link>
        );
      })}
    </div>
  );
}