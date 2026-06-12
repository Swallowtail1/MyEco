import {
  Bike,
  Bus,
  Recycle,
  CupSoda,
  TreePine,
  Leaf,
  Trash2,
  Pencil,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  point_reward: number;
  carbon_factor: number;
  daily_limit: number;
};

type AdminCategoryCardProps = {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  deletingId: string | null;
};

export default function AdminCategoryCard({
  category,
  onEdit,
  onDelete,
  deletingId,
}: AdminCategoryCardProps) {
  const Icon = getIcon(category.icon);
  const isDeleting = deletingId === category.id;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-green-400/30 hover:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
            <Icon size={24} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">{category.name}</h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {category.description ?? "No description"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onEdit(category)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDelete(category.id)}
            disabled={isDeleting}
            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-gray-500">Point Reward</p>
          <p className="mt-1 text-lg font-bold text-green-400">
            {category.point_reward} pts
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-gray-500">Carbon Factor</p>
          <p className="mt-1 text-lg font-bold text-cyan-400">
            {category.carbon_factor} kg CO₂
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-gray-500">Daily Limit</p>
          <p className="mt-1 text-lg font-bold text-yellow-400">
            {category.daily_limit}x / day
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
