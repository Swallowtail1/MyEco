import toast from "react-hot-toast";
import {
  Award,
  Leaf,
  Recycle,
  Trophy,
  Globe,
  Sprout,
} from "lucide-react";

type BadgeToastData = {
  name: string;
  description: string | null;
  icon: string | null;
  required_points: number;
};

export function showBadgeToast(badge: BadgeToastData) {
  const Icon = getBadgeIcon(badge.icon);

  toast.custom(
    (t) => (
      <div
        className={`w-[340px] rounded-3xl border border-green-400/30 bg-[#0b1720] p-5 shadow-2xl transition-all ${
          t.visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
            <Icon size={28} />
          </div>

          <div>
            <p className="text-sm font-semibold text-green-400">
              New Badge Unlocked!
            </p>

            <h3 className="mt-1 text-lg font-bold text-white">
              {badge.name}
            </h3>

            {badge.description && (
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                {badge.description}
              </p>
            )}

            <p className="mt-3 text-xs text-gray-500">
              Required: {badge.required_points} eco points
            </p>
          </div>
        </div>
      </div>
    ),
    {
      duration: 5000,
      position: "top-right",
    }
  );
}

export function showMultipleBadgeToasts(
  badges: BadgeToastData[]
) {
  badges.forEach((badge, index) => {
    setTimeout(() => {
      showBadgeToast(badge);
    }, index * 700);
  });
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