import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Flame,
  Trophy,
  Bike,
  Recycle,
  Zap,
  CupSoda,
  Leaf,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type ChallengePreview = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  reward_points: number | null;
  carbon_reward: number | null;
  target_count: number | null;
  start_date: string | null;
  end_date: string | null;
};

function getChallengeIcon(icon: string | null) {
  const iconName = icon?.toLowerCase().trim();
  const iconClass = "h-7 w-7";

  switch (iconName) {
    case "bike":
    case "bike ride":
      return <Bike className={iconClass} />;

    case "recycle":
    case "recycling":
      return <Recycle className={iconClass} />;

    case "zap":
    case "electricity":
    case "save electricity":
      return <Zap className={iconClass} />;

    case "cup":
    case "tumbler":
    case "bring tumbler":
      return <CupSoda className={iconClass} />;

    case "leaf":
    case "tree":
    case "plant":
      return <Leaf className={iconClass} />;

    default:
      return <Leaf className={iconClass} />;
  }
}

export default async function ChallengesPreview() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_public_challenges_preview");

  if (error) {
    console.error("Challenges preview error:", error.message);
  }

  const challenges = (data ?? []) as ChallengePreview[];

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm text-green-300">
            <Flame size={16} />
            Weekly Eco Challenges
          </div>

          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Take Small Actions, Earn Big Impact
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Ikuti tantangan mingguan, bangun kebiasaan ramah lingkungan, dan
            kumpulkan poin untuk setiap kontribusi.
          </p>
        </div>

        {challenges.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="text-gray-400">
              Belum ada challenge aktif saat ini. Cek lagi nanti untuk tantangan
              eco terbaru.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.06]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10 text-green-300">
                    {getChallengeIcon(challenge.icon)}
                  </div>

                  <div className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm font-medium text-green-300">
                    +{Number(challenge.reward_points ?? 0)} pts
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {challenge.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                  {challenge.description ??
                    "Complete this challenge and grow your eco impact."}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <Trophy size={16} />
                      Target
                    </span>

                    <span className="text-sm font-semibold text-white">
                      {Number(challenge.target_count ?? 1)} activities
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <CalendarDays size={16} />
                      CO₂ Reward
                    </span>

                    <span className="text-sm font-semibold text-cyan-300">
                      {Number(challenge.carbon_reward ?? 0).toFixed(1)} kg
                    </span>
                  </div>
                </div>

                <Link
                  href="/challenges"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-green-300"
                >
                  Join Challenge
                  <ArrowRight size={17} />
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/challenges"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-300 transition hover:text-green-200"
          >
            View all challenges
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
