"use client";

import { Dialog } from "@headlessui/react";
import { X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

type Challenge = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  reward_points: number;
  carbon_reward: number;
  start_date: string | null;
  end_date: string | null;
  target_category_id: string | null;
  target_category_name: string | null;
  target_count: number;
};

type ChallengeFormValues = {
  title: string;
  description: string;
  icon: string;
  reward_points: number;
  carbon_reward: number;
  target_category_id: string;
  target_count: number;
};

type ChallengeFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedChallenge: Challenge | null;
  onSubmit: (values: ChallengeFormValues) => Promise<void>;
};

const iconOptions = [
  { label: "Trophy", value: "trophy" },
  { label: "Bike", value: "bike" },
  { label: "Recycle", value: "recycle" },
  { label: "Zap", value: "zap" },
  { label: "Cup", value: "cup" },
];

export default function ChallengeFormModal({
  isOpen,
  onClose,
  categories,
  selectedChallenge,
  onSubmit,
}: ChallengeFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("trophy");
  const [rewardPoints, setRewardPoints] = useState(50);
  const [carbonReward, setCarbonReward] = useState(1);
  const [targetCategoryId, setTargetCategoryId] = useState("");
  const [targetCount, setTargetCount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(selectedChallenge);

  useEffect(() => {
    if (selectedChallenge) {
      setTitle(selectedChallenge.title);
      setDescription(selectedChallenge.description ?? "");
      setIcon(selectedChallenge.icon ?? "trophy");
      setRewardPoints(selectedChallenge.reward_points);
      setCarbonReward(selectedChallenge.carbon_reward);
      setTargetCategoryId(selectedChallenge.target_category_id ?? "");
      setTargetCount(selectedChallenge.target_count);
    } else {
      setTitle("");
      setDescription("");
      setIcon("trophy");
      setRewardPoints(50);
      setCarbonReward(1);
      setTargetCategoryId(categories[0]?.id ?? "");
      setTargetCount(1);
    }

    setError("");
  }, [selectedChallenge, categories, isOpen]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!title.trim()) {
        throw new Error("Title wajib diisi");
      }

      if (!targetCategoryId) {
        throw new Error("Target category wajib dipilih");
      }

      if (targetCount < 1) {
        throw new Error("Target count minimal 1");
      }

      await onSubmit({
        title,
        description,
        icon,
        reward_points: Number(rewardPoints),
        carbon_reward: Number(carbonReward),
        target_category_id: targetCategoryId,
        target_count: Number(targetCount),
      });

      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menyimpan challenge");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1720] p-6 text-white shadow-2xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <Dialog.Title className="text-2xl font-bold">
                {isEditMode ? "Edit Challenge" : "Add Challenge"}
              </Dialog.Title>

              <p className="mt-1 text-sm text-gray-400">
                Manage challenge target, rewards, and progress requirement.
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
                Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                placeholder="Bike To Campus"
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
                placeholder="Describe this challenge..."
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Icon
                </label>

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

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Target Category
                </label>

                <select
                  value={targetCategoryId}
                  onChange={(e) => setTargetCategoryId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                >
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="bg-[#0b1720]"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Reward Points
                </label>

                <input
                  type="number"
                  value={rewardPoints}
                  onChange={(e) => setRewardPoints(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Carbon Reward
                </label>

                <input
                  type="number"
                  step="0.1"
                  value={carbonReward}
                  onChange={(e) => setCarbonReward(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Target Count
                </label>

                <input
                  type="number"
                  min={1}
                  value={targetCount}
                  onChange={(e) => setTargetCount(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                />
              </div>
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
                  : "Create Challenge"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}