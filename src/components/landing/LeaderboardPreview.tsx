import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Medal, Trophy } from "lucide-react";

type LeaderboardUser = {
  id: string;
  username: string | null;
  campus: string | null;
  avatar_url: string | null;
  eco_points: number | null;
  carbon_saved: number | null;
};

export default async function LeaderboardPreview() {
  const supabase = await createClient();

  const { data: users, error } = await supabase.rpc(
    "get_public_leaderboard_preview",
  );

  if (error) {
    console.error("Leaderboard preview error:", error.message);
  }

  const topUsers = (users ?? []) as LeaderboardUser[];

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm text-green-300">
            <Trophy size={16} />
            Top Eco Warriors
          </div>

          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Leaderboard Terbaik
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Lihat pengguna dengan kontribusi eco points tertinggi di EcoTrack.
          </p>
        </div>

        {topUsers.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="text-gray-400">
              Belum ada data leaderboard. Jadilah pengguna pertama yang mencatat
              aktivitas ramah lingkungan!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {topUsers.map((user, index) => {
              const rank = index + 1;

              return (
                <Link
                  key={user.id}
                  href={`/u/${user.username}`}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.06]"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/10 text-green-300">
                      {rank === 1 ? <Trophy size={22} /> : <Medal size={22} />}
                    </div>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-400">
                      #{rank}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                      {user.avatar_url ? (
                        <Image
                          src={user.avatar_url}
                          alt={user.username ?? "User avatar"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg font-bold text-green-300">
                          {(user.username ?? "U").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-white">
                        @{user.username}
                      </h3>

                      <p className="truncate text-sm text-gray-500">
                        {user.campus ?? "EcoTrack User"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-gray-500">Eco Points</p>
                      <p className="mt-1 text-xl font-bold text-green-300">
                        {Number(user.eco_points ?? 0)}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-gray-500">CO₂ Saved</p>
                      <p className="mt-1 text-xl font-bold text-cyan-300">
                        {Number(user.carbon_saved ?? 0).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/leaderboard"
            className="inline-flex rounded-full bg-green-400 px-6 py-3 font-semibold text-black transition hover:scale-105 hover:bg-green-300"
          >
            View Full Leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
}
