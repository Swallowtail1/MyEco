"use client";

import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";
import EmptyState from "@/components/ui/EmptyState";
import AdminUserCard from "./AdminUserCard";

const supabase = createClient();
type AdminUser = {
  id: string;
  email: string | null;
  username: string | null;
  campus: string | null;
  avatar_url: string | null;
  role: string;
  eco_points: number;
  carbon_saved: number;
  streak: number;
  onboarding_completed: boolean;
  created_at: string | null;
};

type AdminUsersClientProps = {
  users: AdminUser[];
};

export default function AdminUsersClient({
  users,
}: AdminUsersClientProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin">(
    "all"
  );
  const [changingRoleId, setChangingRoleId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        user.username?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.campus?.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const handleChangeRole = async (
    userId: string,
    nextRole: "user" | "admin"
  ) => {
    const confirmed = window.confirm(
      `Yakin mau ubah role user ini menjadi ${nextRole}?`
    );

    if (!confirmed) return;

    try {
      setChangingRoleId(userId);

      const { error } = await supabase
        .from("profiles")
        .update({
          role: nextRole,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) {
        throw error;
      }

      toast.success(`User role updated to ${nextRole}`);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Gagal mengubah role user");
      }
    } finally {
      setChangingRoleId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">
          Manage Users
        </h1>

        <p className="mt-2 text-gray-400">
          View users, monitor eco progress, and manage roles.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search username, email, or campus..."
              className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-white outline-none placeholder:text-gray-500 focus:border-green-400"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as "all" | "user" | "admin")
            }
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400 lg:w-44"
          >
            <option value="all" className="bg-[#0b1720]">
              All Roles
            </option>
            <option value="user" className="bg-[#0b1720]">
              User
            </option>
            <option value="admin" className="bg-[#0b1720]">
              Admin
            </option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-semibold text-green-400">
              {filteredUsers.length}
            </span>{" "}
            user(s)
          </p>

          {(searchQuery || roleFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("all");
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users yet"
          description="Users will appear here after they register to EcoTrack."
        />
      ) : filteredUsers.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matching users"
          description="Try changing your search keyword or role filter."
          action={
            <button
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("all");
              }}
              className="rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-5">
          {filteredUsers.map((user) => (
            <AdminUserCard
              key={user.id}
              user={user}
              changingRoleId={changingRoleId}
              onChangeRole={handleChangeRole}
            />
          ))}
        </div>
      )}
    </div>
  );
}