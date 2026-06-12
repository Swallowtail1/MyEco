"use client";

import { Dialog } from "@headlessui/react";
import { X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type Badge = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  required_points: number;
  created_at: string | null;
};

type BadgeFormValues = {
  name: string;
  description: string;
  icon: string;
  required_points: number;
};

type BadgeFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedBadge: Badge | null;
  onSubmit: (values: BadgeFormValues) => Promise<void>;
};

const iconOptions = [
  { label: "Award", value: "award" },
  { label: "Sprout", value: "sprout" },
  { label: "Leaf", value: "leaf" },
  { label: "Recycle", value: "recycle" },
  { label: "Trophy", value: "trophy" },
  { label: "Globe", value: "globe" },
];

export default function BadgeFormModal({
  isOpen,
  onClose,
  selectedBadge,
  onSubmit,
}: BadgeFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("award");
  const [requiredPoints, setRequiredPoints] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(selectedBadge);

  useEffect(() => {
    if (selectedBadge) {
      setName(selectedBadge.name);
      setDescription(selectedBadge.description ?? "");
      setIcon(selectedBadge.icon ?? "award");
      setRequiredPoints(selectedBadge.required_points);
    } else {
      setName("");
      setDescription("");
      setIcon("award");
      setRequiredPoints(0);
    }

    setError("");
  }, [selectedBadge, isOpen]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!name.trim()) {
        throw new Error("Nama badge wajib diisi");
      }

      if (requiredPoints < 0) {
        throw new Error("Required points tidak boleh negatif");
      }

      await onSubmit({
        name,
        description,
        icon,
        required_points: Number(requiredPoints),
      });

      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menyimpan badge");
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
                {isEditMode ? "Edit Badge" : "Add Badge"}
              </Dialog.Title>

              <p className="mt-1 text-sm text-gray-400">
                Manage badge name, icon, and point threshold.
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
                Badge Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-400"
                placeholder="Eco Hero"
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
                placeholder="Describe this badge..."
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
                  Required Points
                </label>

                <input
                  type="number"
                  min={0}
                  value={requiredPoints}
                  onChange={(e) =>
                    setRequiredPoints(Number(e.target.value))
                  }
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
                  : "Create Badge"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}