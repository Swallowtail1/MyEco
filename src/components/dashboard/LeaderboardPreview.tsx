import Link from "next/link";
import Image from "next/image";
import { Trophy, Flame } from "lucide-react";

type LeaderboardUser = {
  id: string;
  username: string | null;
  campus: string | null;
  avatar_url: string | null;
  eco_points: number;
  streak: number;
};

interface LeaderboardPreviewProps {
  users: LeaderboardUser[];
  currentUserId: string;
}

export default function LeaderboardPreview({
  users,
  currentUserId,
}: LeaderboardPreviewProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">
            Leaderboard
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Top eco warriors this week.
          </p>
        </div>

        <Link
          href="/leaderboard"
          className="text-green-400 text-sm hover:underline"
        >
          View All
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="py-10 text-center">
          <Trophy
            className="mx-auto text-gray-500 mb-3"
            size={34}
          />

          <p className="text-gray-400">
            No leaderboard data yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user, index) => {
            const isCurrentUser =
              user.id === currentUserId;

            return (
              <div
                key={user.id}
                className={`flex items-center justify-between gap-4 rounded-2xl p-4 border transition ${
                  isCurrentUser
                    ? "bg-green-400/10 border-green-400/30"
                    : "bg-white/5 border-white/10 hover:border-green-400/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 text-white font-bold">
                    #{index + 1}
                  </div>

                  <div className="w-10 h-10 rounded-full overflow-hidden bg-green-400/10 border border-green-400/20">
                    {user.avatar_url?.startsWith("http") ? (
                      <Image
                        src={user.avatar_url}
                        alt={user.username ?? "User Avatar"}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-green-400 font-bold">
                        {user.username?.charAt(0).toUpperCase() ??
                          "U"}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      {user.username ?? "Unknown"}
                      {isCurrentUser && (
                        <span className="text-green-400 ml-1">
                          (You)
                        </span>
                      )}
                    </p>

                    <p className="text-gray-400 text-xs">
                      {user.campus ?? "No campus"}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-green-400 font-bold">
                    {user.eco_points} pts
                  </p>

                  <p className="text-orange-400 text-xs flex items-center justify-end gap-1">
                    <Flame size={13} />
                    {user.streak}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}