import {
  Award,
  Leaf,
  Recycle,
  Trophy,
  Globe,
  Sprout,
} from "lucide-react";

type UserBadge = {
  id: string;
  earned_at: string;
  badges: {
    name: string;
    description: string | null;
    icon: string | null;
    required_points: number;
  } | null;
};

type ProfileBadgesProps = {
  badges: UserBadge[];
};

export default function ProfileBadges({
  badges,
}: ProfileBadgesProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold">
          Achievements
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Badges you have earned from your eco journey.
        </p>
      </div>

      {badges.length === 0 ? (
        <div className="text-center py-10">
          <Award
            size={36}
            className="mx-auto text-gray-500 mb-3"
          />

          <p className="text-gray-400">
            No badges yet. Keep collecting eco points!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {badges.map((item) => {
            const Icon = getBadgeIcon(
              item.badges?.icon
            );

            return (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-green-400/30 transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-400/10 flex items-center justify-center mb-4">
                  <Icon
                    size={24}
                    className="text-green-400"
                  />
                </div>

                <h3 className="text-white font-bold">
                  {item.badges?.name ??
                    "Unknown Badge"}
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  {item.badges?.description}
                </p>

                <p className="text-green-400 text-xs mt-4">
                  Required:{" "}
                  {item.badges?.required_points ?? 0} pts
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  Earned{" "}
                  {new Date(
                    item.earned_at
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      )}
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