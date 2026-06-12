"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Leaf,
  ArrowLeft,
  Users,
  Award,
} from "lucide-react";

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

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:sticky lg:top-0 lg:flex h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="p-6">
        <h1 className="text-2xl font-black text-green-400">MyEco Admin</h1>

        <p className="mt-1 text-sm text-gray-500">Management Panel</p>
      </div>

      <nav className="flex-1 space-y-2 px-4">
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
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-green-400 text-black font-semibold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to App
        </Link>
      </div>
    </aside>
  );
}
