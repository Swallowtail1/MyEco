import {
  Leaf,
  Cloud,
  Flame,
  ListChecks,
  Trophy,
  Award,
} from "lucide-react";

type ProfileStatsProps = {
  ecoPoints: number;
  carbonSaved: number;
  streak: number;
  totalActivities: number;
  completedChallenges: number;
  currentBadge: string;
};

const statsConfig = [
  {
    key: "ecoPoints",
    title: "Eco Points",
    icon: Leaf,
    color: "text-green-400",
  },
  {
    key: "carbonSaved",
    title: "Carbon Saved",
    icon: Cloud,
    color: "text-cyan-400",
  },
  {
    key: "streak",
    title: "Current Streak",
    icon: Flame,
    color: "text-orange-400",
  },
  {
    key: "totalActivities",
    title: "Total Activities",
    icon: ListChecks,
    color: "text-blue-400",
  },
  {
    key: "completedChallenges",
    title: "Completed Challenges",
    icon: Trophy,
    color: "text-yellow-400",
  },
  {
    key: "badge",
    title: "Top Badge",
    icon: Award,
    color: "text-purple-400",
  },
];

export default function ProfileStats({
  ecoPoints,
  carbonSaved,
  streak,
  totalActivities,
  completedChallenges,
  currentBadge,
}: ProfileStatsProps) {
  const values: Record<string, string | number> = {
  ecoPoints,
  carbonSaved: `${carbonSaved} kg`,
  streak: `${streak} days`,
  totalActivities,
  completedChallenges,
  badge: currentBadge,
};

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {statsConfig.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-green-400/30 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
              <Icon className={item.color} size={22} />
            </div>

            <p className="text-gray-400 text-sm">
              {item.title}
            </p>

            <h2 className="text-white text-3xl font-bold mt-2">
              {values[item.key]}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
