"use client";

import { Dialog } from "@headlessui/react";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkAndAwardBadges } from "@/services/badgeService";
import { createClient } from "@/lib/supabase/client";
import { showMultipleBadgeToasts } from "@/utils/badgeToast";
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

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export default function AddActivityModal({
  isOpen,
  onClose,
  categories,
}: AddActivityModalProps) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");

  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function getTodayRangeJakarta() {
    const now = new Date();

    const start = new Date(
      now.toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );

    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!selectedCategory) {
        throw new Error("Pilih activity terlebih dahulu");
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User belum login");
      }

      const category = categories.find((item) => item.id === selectedCategory);

      if (!category) {
        throw new Error("Category tidak ditemukan");
      }

      const { data, error: rpcError } = await supabase.rpc(
        "add_user_activity",
        {
          p_category_id: category.id,
          p_notes: notes || null,
        },
      );

      if (rpcError) {
        throw rpcError;
      }

      const newTotalPoints = Number(data?.new_total_points ?? 0);

      toast.success("Activity added successfully!");

      const unlockedBadges = await checkAndAwardBadges(user.id, newTotalPoints);

      if (unlockedBadges.length > 0) {
        showMultipleBadgeToasts(unlockedBadges);
      }

      setSelectedCategory("");
      setNotes("");
      onClose();
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menambahkan activity");
      }
    } finally {
      setLoading(false);
    }
  };

  const category = categories.find((item) => item.id === selectedCategory);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-6">
        <Dialog.Panel className="w-full max-w-lg rounded-3xl bg-[#0b1720] border border-white/10 p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Dialog.Title className="text-2xl font-bold">
                Add Activity
              </Dialog.Title>

              <p className="text-gray-400 text-sm mt-1">
                Choose your eco-friendly activity.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Activity Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-green-400"
              >
                <option value="" className="bg-[#0b1720]">
                  Select activity
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-[#0b1720]"
                  >
                    {category.name} — +{category.point_reward} pts
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <CategoryPreview
                category={categories.find(
                  (item) => item.id === selectedCategory,
                )}
              />
            )}

            {category && (
              <p className="mt-2 text-sm text-gray-400">
                Daily limit:{" "}
                <span className="text-green-400 font-semibold">
                  {category.daily_limit}x per day
                </span>
              </p>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-2">Notes</label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Berangkat ke kampus naik sepeda..."
                rows={4}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white outline-none resize-none focus:border-green-400"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-400 text-black font-semibold hover:scale-[1.02] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading ? "Saving..." : "Save Activity"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function CategoryPreview({ category }: { category?: Category }) {
  if (!category) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-gray-400 text-sm">Eco Points</p>

        <p className="text-green-400 font-bold text-xl mt-1">
          +{category.point_reward}
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-gray-400 text-sm">Carbon Saved</p>

        <p className="text-cyan-400 font-bold text-xl mt-1">
          +{category.carbon_factor} kg
        </p>
      </div>
    </div>
  );
}
