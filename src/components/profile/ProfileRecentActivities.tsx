import Link from "next/link";
import { Bike, Bus, Recycle, CupSoda, TreePine, Leaf } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

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

type ProfileRecentActivitiesProps = {
  activities: RecentActivity[];
  showAddButton?: boolean;
};

export default function ProfileRecentActivities({
  activities,
  showAddButton = true,
}: ProfileRecentActivitiesProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Recent Activities</h2>

          <p className="text-gray-400 text-sm mt-1">
            Your latest contributions to the planet.
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
        <EmptyState
          icon={Leaf}
          title="No recent activities"
          description={
            showAddButton
              ? "Start tracking your eco actions and build your green journey."
              : "This user has not shared any recent activities yet."
          }
          action={
            showAddButton ? (
              <Link
                href="/activities"
                className="rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
              >
                Add Activity
              </Link>
            ) : null
          }
        />
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getIcon(activity.activity_categories?.icon);

            return (
              <div
                key={activity.id}
                className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-green-400/30 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-green-400/10 flex items-center justify-center">
                    <Icon size={20} className="text-green-400" />
                  </div>

                  <div>
                    <h3 className="text-white font-semibold">
                      {activity.activity_categories?.name ?? "Unknown Activity"}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {new Date(activity.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>

                    {activity.notes && (
                      <p className="text-gray-300 text-sm mt-1">
                        {activity.notes}
                      </p>
                    )}
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
