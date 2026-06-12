import {
  Award,
  Leaf,
  Recycle,
  Trophy,
  Globe,
  Sprout,
  Pencil,
  Trash2,
} from "lucide-react";

type Badge = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  required_points: number;
  created_at: string | null;
};

type AdminBadgeCardProps = {
  badge: Badge;
  deletingId: string | null;
  onEdit: (badge: Badge) => void;
  onDelete: (badgeId: string) => void;
};

export default function AdminBadgeCard({
  badge,
  deletingId,
  onEdit,
  onDelete,
}: AdminBadgeCardProps) {
  const Icon = getBadgeIcon(badge.icon);
  const isDeleting = deletingId === badge.id;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-green-400/30 hover:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
            <Icon size={28} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              {badge.name}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {badge.description ?? "No description"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onEdit(badge)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDelete(badge.id)}
            disabled={isDeleting}
            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs text-gray-500">
          Required Points
        </p>

        <p className="mt-1 text-lg font-bold text-green-400">
          {badge.required_points} pts
        </p>
      </div>
    </div>
  );
}

function getBadgeIcon(icon?: string | null) {
  switch (icon) {
    case "sprout":
      return Sprout;
    case "leaf":
      return Leaf;
    case "recycle":
      return Recycle;
    case "trophy":
      return Trophy;
    case "globe":
      return Globe;
    default:
      return Award;
  }
}