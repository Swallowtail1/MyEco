import { Users, Leaf, Activity, Trophy } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function LiveStats() {
  const supabase = await createClient();

  const { data } = await supabase
    .rpc("get_public_landing_stats")
    .maybeSingle() as { data: { total_users?: number; total_activities?: number; total_carbon_saved?: number; top_username?: string; top_eco_points?: number } | null };

  const stats = [
    {
      label: "Eco Users",
      value: data?.total_users ?? 0,
      icon: Users,
    },
    {
      label: "Activities Logged",
      value: data?.total_activities ?? 0,
      icon: Activity,
    },
    {
      label: "CO₂ Saved",
      value: `${Number(data?.total_carbon_saved ?? 0).toFixed(1)} kg`,
      icon: Leaf,
    },
    {
      label: "Top Champion",
      value: data?.top_username ?? "No user yet",
      icon: Trophy,
      subValue: `${data?.top_eco_points ?? 0} pts`,
    },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.08),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-400">
            Live Impact
          </div>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Real Actions, Real Impact
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            MyEco mengubah kebiasaan berkelanjutan sehari-hari menjadi dampak kolektif yang terukur.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-green-400/30 hover:bg-white/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
                  <Icon size={24} />
                </div>

                <p className="text-3xl font-black text-white">
                  {stat.value}
                </p>

                {stat.subValue && (
                  <p className="mt-1 text-sm font-medium text-green-400">
                    {stat.subValue}
                  </p>
                )}

                <p className="mt-2 text-sm text-gray-400">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}