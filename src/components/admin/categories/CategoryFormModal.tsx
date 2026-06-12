"use client";

import { Dialog } from "@headlessui/react";
import { X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  point_reward: number;
  carbon_factor: number;
  daily_limit: number;
};

type CategoryFormValues = {
  name: string;
  description: string;
  icon: string;
  point_reward: number;
  carbon_factor: number;
  daily_limit: number;
};

type CategoryFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: Category | null;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
};

const iconOptions = [
  { label: "Leaf", value: "leaf" },
  { label: "Bike", value: "bike" },
  { label: "Bus", value: "bus" },
  { label: "Recycle", value: "recycle" },
  { label: "Cup", value: "cup" },
  { label: "Tree", value: "tree" },
];

export default function CategoryFormModal({
  isOpen,
  onClose,
  selectedCategory,
  onSubmit,
}: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("leaf");
  const [pointReward, setPointReward] = useState(10);
  const [carbonFactor, setCarbonFactor] = useState(0.5);
  const [dailyLimit, setDailyLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(selectedCategory);

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setDescription(selectedCategory.description ?? "");
      setIcon(selectedCategory.icon ?? "leaf");
      setPointReward(selectedCategory.point_reward);
      setCarbonFactor(selectedCategory.carbon_factor);
      setDailyLimit(selectedCategory.daily_limit);
    } else {
      setName("");
      setDescription("");
      setIcon("leaf");
      setPointReward(10);
      setCarbonFactor(0.5);
      setDailyLimit(3);
    }

    setError("");
  }, [selectedCategory, isOpen]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!name.trim()) {
        throw new Error("Nama kategori wajib diisi");
      }

      if (pointReward < 0) {
        throw new Error("Point reward tidak boleh negatif");
      }

      if (carbonFactor < 0) {
        throw new Error("Carbon factor tidak boleh negatif");
      }

      if (dailyLimit < 1) {
        throw new Error("Daily limit minimal 1");
      }

      await onSubmit({
        name,
        description,
        icon,
        point_reward: Number(pointReward),
        carbon_factor: Number(carbonFactor),
        daily_limit: Number(dailyLimit),
      });

      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menyimpan kategori");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0b1720] p-6 text-white shadow-2xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <Dialog.Title className="text-2xl font-bold">
                {isEditMode ? "Edit Category" : "Add Category"}
              </Dialog.Title>

              <p className="mt-1 text-sm text-gray-400">
                Manage eco activity category, reward, and carbon factor.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-white/5 p-2 transition hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Category Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                placeholder="Bike Ride"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                placeholder="Describe this activity category..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">Icon</label>

              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
              >
                {iconOptions.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    className="bg-[#0b1720]"
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Point Reward
                </label>

                <input
                  type="number"
                  min={0}
                  value={pointReward}
                  onChange={(e) => setPointReward(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Carbon Factor
                </label>

                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={carbonFactor}
                  onChange={(e) => setCarbonFactor(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Daily Limit
              </label>

              <input
                type="number"
                min={1}
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Category"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
