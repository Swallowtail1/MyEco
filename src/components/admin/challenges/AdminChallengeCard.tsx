import {
  Trophy,
  Bike,
  Recycle,
  Zap,
  CupSoda,
  Trash2,
  Pencil,
} from "lucide-react";

type Challenge = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  reward_points: number;
  carbon_reward: number;
  start_date: string | null;
  end_date: string | null;
  target_category_id: string | null;
  target_category_name: string | null;
  target_count: number;
};

type AdminChallengeCardProps = {
  challenge: Challenge;
  onEdit: (challenge: Challenge) => void;
  onDelete: (challengeId: string) => void;
  deletingId: string | null;
};

export default function AdminChallengeCard({
  challenge,
  onEdit,
  onDelete,
  deletingId,
}: AdminChallengeCardProps) {
  const Icon = getIcon(challenge.icon);
  const isDeleting = deletingId === challenge.id;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-green-400/30 hover:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
            <Icon size={24} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              {challenge.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {challenge.description ?? "No description"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onEdit(challenge)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDelete(challenge.id)}
            disabled={isDeleting}
            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-gray-500">Reward Points</p>
          <p className="mt-1 text-lg font-bold text-green-400">
            {challenge.reward_points} pts
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-gray-500">Carbon Reward</p>
          <p className="mt-1 text-lg font-bold text-cyan-400">
            {challenge.carbon_reward} kg
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-gray-500">Target Category</p>
          <p className="mt-1 text-lg font-bold text-white">
            {challenge.target_category_name ?? "Not set"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-gray-500">Target Count</p>
          <p className="mt-1 text-lg font-bold text-white">
            {challenge.target_count} activities
          </p>
        </div>
      </div>
    </div>
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