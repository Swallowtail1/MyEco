"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ActivityCard from "./ActivityCard";
import AddActivityModal from "./AddActivityModal";
import { Search, SlidersHorizontal, Leaf, Plus } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import toast from "react-hot-toast";

const supabase = createClient();

type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  point_reward: number;
  carbon_factor: number;
  daily_limit: number;
};

type Activity = {
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

interface ActivitiesClientProps {
  activities: Activity[];
  categories: Category[];
}

export default function ActivitiesClient({
  activities,
  categories,
}: ActivitiesClientProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  

  const handleDeleteActivity = async (
  activityId: string
) => {
  const confirmed = window.confirm(
    "Yakin mau hapus aktivitas ini? Eco points dan carbon saved akan dikurangi."
  );

  if (!confirmed) return;

  try {
    setError("");
    setDeletingId(activityId);

    const { error: rpcError } = await supabase.rpc(
      "delete_user_activity",
      {
        p_activity_id: activityId,
      }
    );

    if (rpcError) {
      throw rpcError;
    }

    toast.success("Activity deleted successfully!");
    router.refresh();
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
      toast.error(err.message);
    } else {
      setError("Gagal menghapus aktivitas");
      toast.error("Gagal menghapus aktivitas");
    }
  } finally {
    setDeletingId(null);
  }
};

  const filteredActivities = activities
    .filter((activity) => {
      const categoryName =
        activity.activity_categories?.name?.toLowerCase() ?? "";

      const notes = activity.notes?.toLowerCase() ?? "";

      const query = searchQuery.toLowerCase();

      const matchesSearch =
        categoryName.includes(query) || notes.includes(query);

      const matchesCategory =
        selectedCategory === "all" ||
        activity.activity_categories?.name === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Activities</h1>

          <p className="text-gray-400 mt-1">
            Track your daily eco-friendly actions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-400 text-black font-semibold hover:scale-[1.02] transition"
        >
          <Plus size={18} />
          Add Activity
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by activity or notes..."
              className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-white outline-none placeholder:text-gray-500 focus:border-green-400"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-10 text-white outline-none focus:border-green-400 lg:w-56"
            >
              <option value="all" className="bg-[#0b1720]">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                  className="bg-[#0b1720]"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400 lg:w-40"
          >
            <option value="newest" className="bg-[#0b1720]">
              Newest
            </option>

            <option value="oldest" className="bg-[#0b1720]">
              Oldest
            </option>
          </select>
        </div>

        {(searchQuery || selectedCategory !== "all") && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-sm text-gray-400">
              Showing{" "}
              <span className="font-semibold text-green-400">
                {filteredActivities.length}
              </span>{" "}
              result(s)
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortOrder("newest");
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
            selectedCategory === "all"
              ? "border-green-400 bg-green-400 text-black"
              : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              selectedCategory === category.name
                ? "border-green-400 bg-green-400 text-black"
                : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}

      {activities.length === 0 ? (
        <EmptyState
          icon={Leaf}
          title="No activities yet"
          description="Start your first eco-friendly action and collect points for your green journey."
          action={
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Add Your First Activity
            </button>
          }
        />
      ) : filteredActivities.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matching activities"
          description="Try changing your search keyword, category filter, or sort option."
          action={
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortOrder("newest");
              }}
              className="rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-4">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              id={activity.id}
              category={
                activity.activity_categories?.name ?? "Unknown Activity"
              }
              icon={activity.activity_categories?.icon}
              points={activity.points_earned}
              carbon={activity.carbon_saved}
              notes={activity.notes}
              date={new Date(activity.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              deletingId={deletingId}
              onDelete={handleDeleteActivity}
            />
          ))}
        </div>
      )}

      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
      />
    </div>
  );
}
