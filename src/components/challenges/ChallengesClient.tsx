"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkAndAwardBadges } from "@/services/badgeService";
import { createClient } from "@/lib/supabase/client";
import ChallengeCard from "./ChallengeCard";
import EmptyState from "@/components/ui/EmptyState";
import { Trophy } from "lucide-react";
import { showMultipleBadgeToasts } from "@/utils/badgeToast";
import toast from "react-hot-toast";

const supabase = createClient();

type Challenge = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  reward_points: number;
  carbon_reward: number;
  start_date: string | null;
  end_date: string | null;
  user_status: "not_joined" | "joined" | "completed";
  target_count: number;
  progress_count: number;
  target_category_name: string | null;
};

type Profile = {
  eco_points: number;
  carbon_saved: number;
};

interface ChallengesClientProps {
  challenges: Challenge[];
  userId: string;
  profile: Profile;
}

export default function ChallengesClient({
  challenges,
  userId,
  profile,
}: ChallengesClientProps) {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [error, setError] = useState("");

  const handleJoin = async (challengeId: string) => {
    try {
      setError("");
      setLoadingId(challengeId);

      const { error } = await supabase.from("user_challenges").insert({
        user_id: userId,
        challenge_id: challengeId,
        status: "joined",
      });

      if (error) throw error;

      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal join challenge");
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleComplete = async (challengeId: string) => {
    try {
      setError("");
      setLoadingId(challengeId);

      const challenge = challenges.find((item) => item.id === challengeId);

      if (!challenge) {
        throw new Error("Challenge tidak ditemukan");
      }

      if (challenge.progress_count < challenge.target_count) {
        throw new Error("Challenge progress belum selesai");
      }

      const { error: updateChallengeError } = await supabase
        .from("user_challenges")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("challenge_id", challengeId);

      if (updateChallengeError) {
        throw updateChallengeError;
      }

      toast.success("Challenge completed!");

      const newTotalPoints =
        Number(profile.eco_points ?? 0) + Number(challenge.reward_points ?? 0);

      const newCarbonSaved =
        Number(profile.carbon_saved ?? 0) +
        Number(challenge.carbon_reward ?? 0);

      const { error: updateProfileError } = await supabase
        .from("profiles")
        .update({
          eco_points: newTotalPoints,
          carbon_saved: newCarbonSaved,
        })
        .eq("id", userId);

      if (updateProfileError) {
        throw updateProfileError;
      }

      const unlockedBadges = await checkAndAwardBadges(userId, newTotalPoints);

      if (unlockedBadges.length > 0) {
        showMultipleBadgeToasts(unlockedBadges);
      }

      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menyelesaikan challenge");
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Challenges</h1>

        <p className="text-gray-400 mt-1">
          Complete weekly eco missions and earn rewards.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}

      {challenges.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No challenges available"
          description="There are no active eco challenges right now. Come back later and keep tracking your green actions."
        />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              loadingId={loadingId}
              onJoin={handleJoin}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
