import {
  Bike,
  Bus,
  Recycle,
  CupSoda,
  TreePine,
  Leaf,
  Trash2,
  Loader2,
} from "lucide-react";

interface ActivityCardProps {
  id: string;
  category: string;
  icon?: string | null;
  points: number;
  carbon: number;
  notes?: string | null;
  date: string;
  deletingId: string | null;
  onDelete: (activityId: string) => void;
}

export default function ActivityCard({
  id,
  category,
  icon,
  points,
  carbon,
  notes,
  date,
  deletingId,
  onDelete,
}: ActivityCardProps) {
  const Icon = getIcon(icon);

  const isDeleting = deletingId === id;

  return (
    <div className="card-hover bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl hover:border-green-400/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-400/10 flex items-center justify-center">
            <Icon className="text-green-400" size={22} />
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg">
              {category}
            </h3>

            <p className="text-sm text-gray-400">
              {date}
            </p>

            {notes && (
              <p className="text-sm text-gray-300 mt-2">
                {notes}
              </p>
            )}
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-green-400 font-bold">
            +{points} pts
          </p>

          <p className="text-cyan-400 text-sm mt-1">
            +{carbon} kg CO₂
          </p>

          <button
            onClick={() => onDelete(id)}
            disabled={isDeleting}
            className="mt-3 inline-flex items-center gap-1 text-red-400 text-sm hover:text-red-300 disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Trash2 size={15} />
            )}

            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function getIcon(icon?: string | null) {
  switch (icon) {
    case "bike":
      return Bike;
    case "bus":
      return Bus;
    case "recycle":
      return Recycle;
    case "cup":
      return CupSoda;
    case "tree":
      return TreePine;
    default:
      return Leaf;
  }
}