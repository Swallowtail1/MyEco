import Image from "next/image";
import { Flame } from "lucide-react";
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

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  currentUserId: string;
}

export default function LeaderboardTable({
  users,
  currentUserId,
}: LeaderboardTableProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-white text-xl font-bold">Global Ranking</h2>

        <p className="text-gray-400 text-sm mt-1">
          Users with the highest eco points.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="text-left text-gray-400 text-sm border-b border-white/10">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Campus</th>
              <th className="px-6 py-4">Eco Points</th>
              <th className="px-6 py-4">Carbon Saved</th>
              <th className="px-6 py-4">Streak</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const isCurrentUser = user.id === currentUserId;

              return (
                <tr
                  key={user.id}
                  className={`border-b border-white/5 transition ${
                    isCurrentUser ? "bg-green-400/10" : "hover:bg-white/5"
                  }`}
                >
                  <td className="px-6 py-4 text-white font-bold">
                    #{index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-green-400/10 border border-green-400/20">
                        {user.avatar_url ? (
                          <Image
                            src={user.avatar_url}
                            alt={user.username ?? "User Avatar"}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Link
                            href={`/u/${encodeURIComponent(user.username ?? "")}`}
                            className="font-semibold text-white transition hover:text-green-400"
                          >
                            {user.username}
                          </Link>
                        )}
                      </div>

                      <div>
                        <p className="text-white font-medium">
                          {user.username ?? "Unknown User"}
                          {isCurrentUser && (
                            <span className="text-green-400 ml-2">(You)</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {user.campus ?? "-"}
                  </td>

                  <td className="px-6 py-4 text-green-400 font-bold">
                    {user.eco_points} pts
                  </td>

                  <td className="px-6 py-4 text-cyan-400">
                    {user.carbon_saved} kg
                  </td>

                  <td className="px-6 py-4 text-orange-400">
                    <div className="flex items-center gap-1">
                      <Flame size={16} />
                      {user.streak}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
