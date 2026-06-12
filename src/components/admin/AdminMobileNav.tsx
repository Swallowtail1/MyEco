"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Users, Trophy, Leaf, Award } from "lucide-react";

const menus = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Challenges",
    href: "/admin/challenges",
    icon: Trophy,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Leaf,
  },
  {
    label: "Badges",
    href: "/admin/badges",
    icon: Award,
  },
];

export default function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#071018]/90 px-2 py-2 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {menus.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs transition ${
                isActive
                  ? "bg-green-400 text-black"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="text-[10px] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
