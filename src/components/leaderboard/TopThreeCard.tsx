import Image from "next/image";
import { Medal, Flame, Leaf } from "lucide-react";
import Link from "next/link";

type LeaderboardUser = {
  id: string;
  username: string | null;
  campus: string | null;
  avatar_url: string | null;
  eco_points: number;
  carbon_saved: number;
  streak: number;
};

interface TopThreeCardProps {
  user: LeaderboardUser;
  rank: number;
}

export default function TopThreeCard({ user, rank }: TopThreeCardProps) {
  const medalStyle =
    rank === 1
      ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/30"
      : rank === 2
        ? "bg-gray-300/10 text-gray-300 border-gray-300/30"
        : "bg-orange-400/10 text-orange-400 border-orange-400/30";

  const href = user.username
    ? `/u/${encodeURIComponent(user.username)}`
    : "/leaderboard";

  return (
    <Link href={href}
      className={`bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl block rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/10 ${
        rank === 1 ? "lg:-translate-y-5" : ""
      }`}
    >
      <div className="flex justify-center mb-5">
        <div
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${medalStyle}`}
        >
          <Medal size={26} />
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-green-400/10 border border-green-400/30">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.username ?? "User Avatar"}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-green-400 font-bold text-2xl">
              {user.username?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400">Rank #{rank}</p>

        <h3 className="text-white font-bold text-xl mt-1">
          {user.username ?? "Unknown User"}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {user.campus ?? "No campus"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-green-400 font-bold text-xl">{user.eco_points}</p>
          <p className="text-gray-400 text-xs mt-1">Points</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-cyan-400 font-bold text-xl">{user.carbon_saved}</p>
          <p className="text-gray-400 text-xs mt-1">kg CO₂</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-orange-400">
          <Flame size={16} />
          {user.streak} days
        </div>

        <div className="flex items-center gap-1 text-green-400">
          <Leaf size={16} />
          Eco
        </div>
      </div>
    </Link>
  );
}
