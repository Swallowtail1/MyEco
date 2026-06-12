"use client";

import { useState } from "react";
import { Plus, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";
import EmptyState from "@/components/ui/EmptyState";

import AdminChallengeCard from "./AdminChallengeCard";
import ChallengeFormModal from "./ChallengeFormModal";

const supabase = createClient();
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

type AdminChallengesClientProps = {
  challenges: Challenge[];
  categories: Category[];
};

export default function AdminChallengesClient({
  challenges,
  categories,
}: AdminChallengesClientProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] =
    useState<Challenge | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    setSelectedChallenge(null);
    setIsModalOpen(true);
  };

  const handleEdit = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: ChallengeFormValues) => {
    if (selectedChallenge) {
      const { error } = await supabase
        .from("challenges")
        .update({
          title: values.title,
          description: values.description,
          icon: values.icon,
          reward_points: values.reward_points,
          carbon_reward: values.carbon_reward,
          target_category_id: values.target_category_id,
          target_count: values.target_count,
        })
        .eq("id", selectedChallenge.id);

      if (error) {
        throw error;
      }

      toast.success("Challenge updated");
    } else {
      const { error } = await supabase.from("challenges").insert({
        title: values.title,
        description: values.description,
        icon: values.icon,
        reward_points: values.reward_points,
        carbon_reward: values.carbon_reward,
        target_category_id: values.target_category_id,
        target_count: values.target_count,
        start_date: new Date().toISOString(),
        end_date: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      });

      if (error) {
        throw error;
      }

      toast.success("Challenge created");
    }

    router.refresh();
  };

  const handleDelete = async (challengeId: string) => {
    const confirmed = window.confirm(
      "Yakin mau hapus challenge ini? Data user_challenges terkait bisa ikut terpengaruh."
    );

    if (!confirmed) return;

    try {
      setDeletingId(challengeId);

      const { error } = await supabase
        .from("challenges")
        .delete()
        .eq("id", challengeId);

      if (error) {
        throw error;
      }

      toast.success("Challenge deleted");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Gagal menghapus challenge");
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
            Manage Challenges
          </h1>

          <p className="mt-2 text-gray-400">
            Create and manage eco challenges, rewards, and progress targets.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
        >
          <Plus size={18} />
          Add Challenge
        </button>
      </div>

      {challenges.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No challenges yet"
          description="Create your first eco challenge for users."
          action={
            <button
              onClick={handleAdd}
              className="rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Add Challenge
            </button>
          }
        />
      ) : (
        <div className="grid gap-5">
          {challenges.map((challenge) => (
            <AdminChallengeCard
              key={challenge.id}
              challenge={challenge}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          ))}
        </div>
      )}

      <ChallengeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        selectedChallenge={selectedChallenge}
        onSubmit={handleSubmit}
      />
    </div>
  );
}