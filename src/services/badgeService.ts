import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type UnlockedBadge = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  required_points: number;
};

export async function checkAndAwardBadges(
  userId: string,
  totalPoints: number
): Promise<UnlockedBadge[]> {
  const { data: eligibleBadges, error: badgesError } =
    await supabase
      .from("badges")
      .select("id, name, description, icon, required_points")
      .lte("required_points", totalPoints)
      .order("required_points", { ascending: true });

  if (badgesError) {
    throw badgesError;
  }

  if (!eligibleBadges || eligibleBadges.length === 0) {
    return [];
  }

  const { data: ownedBadges, error: ownedError } =
    await supabase
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", userId);

  if (ownedError) {
    throw ownedError;
  }

  const ownedBadgeIds = new Set(
    ownedBadges?.map((badge) => badge.badge_id)
  );

  const newBadges = eligibleBadges.filter(
    (badge) => !ownedBadgeIds.has(badge.id)
  );

  if (newBadges.length === 0) {
    return [];
  }

  const { error: insertError } =
    await supabase
      .from("user_badges")
      .insert(
        newBadges.map((badge) => ({
          user_id: userId,
          badge_id: badge.id,
        }))
      );

  if (insertError) {
    throw insertError;
  }

  return newBadges.map((badge) => ({
    id: badge.id,
    name: badge.name,
    description: badge.description,
    icon: badge.icon,
    required_points: Number(badge.required_points ?? 0),
  }));
}