import Link from "next/link";
import {
  Trophy,
  Recycle,
  Bike,
  Zap,
  CupSoda,
} from "lucide-react";

type ActiveChallenge = {
  id: string;
  status: string;
  joined_at: string;
  challenges: {
    title: string;
    description: string | null;
    icon: string | null;
    reward_points: number;
    carbon_reward: number;
  } | null;
};

interface ActiveChallengesProps {
  challenges: ActiveChallenge[];
}

export default function ActiveChallenges({
  challenges,
}: ActiveChallengesProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">
            Active Challenges
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Complete missions and earn rewards.
          </p>
        </div>

        <Link
          href="/challenges"
          className="text-green-400 text-sm hover:underline"
        >
          View All
        </Link>
      </div>

      {challenges.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-400">
            No active challenges.
          </p>

          <Link
            href="/challenges"
            className="inline-block mt-4 px-5 py-3 rounded-xl bg-green-400 text-black font-semibold"
          >
            Join Challenge
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {challenges.map((item) => {
            const Icon = getIcon(item.challenges?.icon);

            return (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-green-400/30 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-green-400/10 flex items-center justify-center">
                    <Icon
                      size={20}
                      className="text-green-400"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-white font-semibold">
                          {item.challenges?.title ??
                            "Unknown Challenge"}
                        </h3>

                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                          {item.challenges?.description}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs border border-cyan-400/20 shrink-0">
                        In Progress
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-gray-400 text-xs">
                          Reward
                        </p>

                        <p className="text-green-400 font-bold">
                          +{item.challenges?.reward_points ?? 0} pts
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-gray-400 text-xs">
                          Carbon
                        </p>

                        <p className="text-cyan-400 font-bold">
                          +{item.challenges?.carbon_reward ?? 0} kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getIcon(icon?: string | null) {
  switch (icon) {
    case "recycle":
      return Recycle;
    case "bike":
      return Bike;
    case "zap":
      return Zap;
    case "cup":
      return CupSoda;
    default:
      return Trophy;
  }
}