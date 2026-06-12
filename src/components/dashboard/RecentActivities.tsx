import Link from "next/link";
import {
  Bike,
  Bus,
  Recycle,
  CupSoda,
  TreePine,
  Leaf,
} from "lucide-react";

type RecentActivity = {
  id: string;
  notes: string | null;
  carbon_saved: number;
  points_earned: number;
  created_at: string;
  activity_categories: {
    name: string;
    icon: string | null;
  } | null;
};

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">
            Recent Activities
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Your latest eco-friendly actions.
          </p>
        </div>

        <Link
          href="/activities"
          className="text-green-400 text-sm hover:underline"
        >
          View All
        </Link>
      </div>

      {activities.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-400">
            No activities yet.
          </p>

          <Link
            href="/activities"
            className="inline-block mt-4 px-5 py-3 rounded-xl bg-green-400 text-black font-semibold"
          >
            Add Activity
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getIcon(
              activity.activity_categories?.icon
            );

            return (
              <div
                key={activity.id}
                className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-green-400/30 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-green-400/10 flex items-center justify-center">
                    <Icon
                      size={20}
                      className="text-green-400"
                    />
                  </div>

                  <div>
                    <h3 className="text-white font-semibold">
                      {activity.activity_categories?.name ??
                        "Unknown Activity"}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {new Date(
                        activity.created_at
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-green-400 font-bold">
                    +{activity.points_earned} pts
                  </p>

                  <p className="text-cyan-400 text-sm">
                    +{activity.carbon_saved} kg CO₂
                  </p>
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