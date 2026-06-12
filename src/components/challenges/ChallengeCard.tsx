"use client";

import { Bike, Recycle, Zap, CupSoda, Trophy, Loader2 } from "lucide-react";

type Challenge = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  reward_points: number;
  carbon_reward: number;
  start_date: string | null;
  end_date: string | null;
  user_status: "not_joined" | "joined" | "completed";
  target_count: number;
  progress_count: number;
  target_category_name: string | null;
};

interface ChallengeCardProps {
  challenge: Challenge;
  loadingId: string | null;
  onJoin: (challengeId: string) => void;
  onComplete: (challengeId: string) => void;
}

export default function ChallengeCard({
  challenge,
  loadingId,
  onJoin,
  onComplete,
}: ChallengeCardProps) {
  const Icon = getIcon(challenge.icon);

  const isLoading = loadingId === challenge.id;

  const progressPercentage = Math.min(
    100,
    Math.round((challenge.progress_count / challenge.target_count) * 100),
  );

  const isProgressCompleted =
    challenge.progress_count >= challenge.target_count;

  const isCompleted = challenge.user_status === "completed";
  const isJoined = challenge.user_status === "joined";
  const isNotJoined = challenge.user_status === "not_joined";

  return (
    <div className="card-hover bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-green-400/40">
      <div className="flex items-start justify-between gap-4">
        <div className="w-14 h-14 rounded-2xl bg-green-400/10 flex items-center justify-center">
          <Icon className="text-green-400" size={26} />
        </div>

        <StatusBadge status={challenge.user_status} />
      </div>

      <div className="mt-6">
        <h3 className="text-white text-xl font-bold">{challenge.title}</h3>

        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
          {challenge.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-gray-400 text-xs">Reward Points</p>

          <p className="text-green-400 font-bold text-xl mt-1">
            +{challenge.reward_points}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-gray-400 text-xs">Carbon Reward</p>

          <p className="text-cyan-400 font-bold text-xl mt-1">
            +{challenge.carbon_reward} kg
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">
              Challenge Progress
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Target: {challenge.target_count}{" "}
              {challenge.target_category_name ?? "eco"} activities
            </p>
          </div>

          <p className="text-sm font-bold text-green-400">
            {challenge.progress_count}/{challenge.target_count}
          </p>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-700"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        {isNotJoined && (
          <button
            onClick={() => onJoin(challenge.id)}
            disabled={loadingId === challenge.id}
            className="mt-4 w-full rounded-xl bg-green-400 px-4 py-3 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loadingId === challenge.id ? "Joining..." : "Join Challenge"}
          </button>
        )}

        {isJoined && (
          <button
            onClick={() => onComplete(challenge.id)}
            disabled={loadingId === challenge.id || !isProgressCompleted}
            className={`mt-4 w-full rounded-xl px-4 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isProgressCompleted
                ? "bg-green-400 text-black hover:scale-[1.02]"
                : "bg-white/10 text-gray-400"
            }`}
          >
            {loadingId === challenge.id
              ? "Processing..."
              : isProgressCompleted
                ? "Complete Challenge"
                : "Progress not complete"}
          </button>
        )}

        {isCompleted && (
          <div className="mt-4 w-full rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-center font-semibold text-green-400">
            Challenge Completed
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "not_joined" | "joined" | "completed";
}) {
  if (status === "completed") {
    return (
      <span className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-xs border border-green-400/20">
        Completed
      </span>
    );
  }

  if (status === "joined") {
    return (
      <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs border border-cyan-400/20">
        In Progress
      </span>
    );
  }

  return (
    <span className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs border border-white/10">
      Available
    </span>
  );
}

function getIcon(icon?: string | null) {
  switch (icon) {
    case "bike":
      return Bike;
    case "recycle":
      return Recycle;
    case "zap":
      return Zap;
    case "cup":
      return CupSoda;
    default:
      return Trophy;
  }
}
