"use client";

import { useState } from "react";
import { Award, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";
import EmptyState from "@/components/ui/EmptyState";

import AdminBadgeCard from "./AdminBadgeCard";
import BadgeFormModal from "./BadgeFormModal";


const supabase = createClient();

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

type AdminBadgesClientProps = {
  badges: Badge[];
};

export default function AdminBadgesClient({
  badges,
}: AdminBadgesClientProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] =
    useState<Badge | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    setSelectedBadge(null);
    setIsModalOpen(true);
  };

  const handleEdit = (badge: Badge) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: BadgeFormValues) => {
    if (selectedBadge) {
      const { error } = await supabase
        .from("badges")
        .update({
          name: values.name,
          description: values.description,
          icon: values.icon,
          required_points: values.required_points,
        })
        .eq("id", selectedBadge.id);

      if (error) {
        throw error;
      }

      toast.success("Badge updated");
    } else {
      const { error } = await supabase.from("badges").insert({
        name: values.name,
        description: values.description,
        icon: values.icon,
        required_points: values.required_points,
      });

      if (error) {
        throw error;
      }

      toast.success("Badge created");
    }

    router.refresh();
  };

  const handleDelete = async (badgeId: string) => {
    const confirmed = window.confirm(
      "Yakin mau hapus badge ini? User yang sudah punya badge ini akan kehilangan referensi badge tersebut."
    );

    if (!confirmed) return;

    try {
      setDeletingId(badgeId);

      const { error } = await supabase
        .from("badges")
        .delete()
        .eq("id", badgeId);

      if (error) {
        throw error;
      }

      toast.success("Badge deleted");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Gagal menghapus badge");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black text-white">
            Manage Badges
          </h1>

          <p className="mt-2 text-gray-400">
            Create and manage achievement badges for EcoTrack users.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
        >
          <Plus size={18} />
          Add Badge
        </button>
      </div>

      {badges.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No badges yet"
          description="Create your first achievement badge for users."
          action={
            <button
              onClick={handleAdd}
              className="rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Add Badge
            </button>
          }
        />
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {badges.map((badge) => (
            <AdminBadgeCard
              key={badge.id}
              badge={badge}
              deletingId={deletingId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <BadgeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedBadge={selectedBadge}
        onSubmit={handleSubmit}
      />
    </div>
  );
}