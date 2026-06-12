import { Sparkles, Trophy, Leaf } from "lucide-react";
import { getEcoLevel } from "@/utils/ecoLevel";

type EcoLevelCardProps = {
  points: number;
};

export default function EcoLevelCard({ points }: EcoLevelCardProps) {
  const level = getEcoLevel(points);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm font-medium text-green-400">
            <Sparkles size={15} />
            Level {level.levelNumber} of {level.totalLevels}
          </div>

          <h2 className="text-2xl font-black text-white">
            {level.name}
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
            {level.message}
          </p>
        </div>

        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-green-400/20 bg-green-400/10 text-green-400">
          {level.nextLevel ? <Leaf size={36} /> : <Trophy size={36} />}
        </div>
      </div>

      <div className="relative mt-7">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {level.nextLevel
              ? `Progress to ${level.nextLevel}`
              : "Maximum level reached"}
          </span>

          <span className="font-semibold text-green-400">
            {level.progress}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-700"
            style={{
              width: `${level.progress}%`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{points} pts</span>

          {level.nextRequiredPoints ? (
            <span>
              {level.remainingPoints} pts left to {level.nextLevel}
            </span>
          ) : (
            <span>Top eco rank unlocked</span>
          )}
        </div>
      </div>
    </div>
  );
}