import Image from "next/image";
import {
  Shield,
  User,
  Leaf,
  Flame,
  Cloud,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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

type AdminUserCardProps = {
  user: AdminUser;
  changingRoleId: string | null;
  onChangeRole: (userId: string, nextRole: "user" | "admin") => void;
};

export default function AdminUserCard({
  user,
  changingRoleId,
  onChangeRole,
}: AdminUserCardProps) {
  const isChanging = changingRoleId === user.id;
  const isAdmin = user.role === "admin";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-green-400/30 hover:bg-white/10">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="flex gap-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-green-400/30 bg-green-400/10">
            {user.avatar_url?.startsWith("http") ? (
              <Image
                src={user.avatar_url}
                alt={user.username ?? "User Avatar"}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xl font-bold text-green-400">
                {user.username?.charAt(0).toUpperCase() ?? "U"}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-white">
                {user.username ?? "Unknown User"}
              </h3>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  isAdmin
                    ? "border border-yellow-400/20 bg-yellow-400/10 text-yellow-400"
                    : "border border-green-400/20 bg-green-400/10 text-green-400"
                }`}
              >
                {isAdmin ? <Shield size={13} /> : <User size={13} />}
                {user.role}
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  user.onboarding_completed
                    ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
                    : "border border-red-400/20 bg-red-400/10 text-red-400"
                }`}
              >
                {user.onboarding_completed ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <XCircle size={13} />
                )}
                {user.onboarding_completed ? "Onboarded" : "Not onboarded"}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              {user.email ?? "No email"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {user.campus ?? "No campus"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            onClick={() =>
              onChangeRole(user.id, isAdmin ? "user" : "admin")
            }
            disabled={isChanging}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition disabled:opacity-50 ${
              isAdmin
                ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "bg-green-400 text-black hover:scale-[1.02]"
            }`}
          >
            {isChanging
              ? "Updating..."
              : isAdmin
                ? "Set as User"
                : "Set as Admin"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-green-400">
            <Leaf size={16} />
            <p className="text-xs text-gray-500">Eco Points</p>
          </div>

          <p className="text-lg font-bold text-white">
            {user.eco_points}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-cyan-400">
            <Cloud size={16} />
            <p className="text-xs text-gray-500">Carbon Saved</p>
          </div>

          <p className="text-lg font-bold text-white">
            {user.carbon_saved.toFixed(1)} kg
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-yellow-400">
            <Flame size={16} />
            <p className="text-xs text-gray-500">Streak</p>
          </div>

          <p className="text-lg font-bold text-white">
            {user.streak} days
          </p>
        </div>
      </div>
    </div>
  );
}