import {
  Bike,
  Recycle,
  TreePine,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { calculateEcoImpact } from "@/utils/ecoImpact";

type EcoImpactCardProps = {
  carbonSaved: number;
};

export default function EcoImpactCard({
  carbonSaved,
}: EcoImpactCardProps) {
  const impact = calculateEcoImpact(carbonSaved);

  const items = [
    {
      label: "Motorcycle ride avoided",
      value: `${impact.motorcycleKm} km`,
      icon: Bike,
    },
    {
      label: "Plastic bottles reduced",
      value: `${impact.plasticBottles}`,
      icon: Recycle,
    },
    {
      label: "Trees absorbing CO₂ for a month",
      value: `${impact.treesMonthly}`,
      icon: TreePine,
    },
    {
      label: "Phone charges offset",
      value: `${impact.phoneCharges}`,
      icon: Smartphone,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-green-400/10 blur-3xl" />

      <div className="relative mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-400">
          <Sparkles size={15} />
          Eco Impact Summary
        </div>

        <h2 className="text-2xl font-black text-white">
          {carbonSaved.toFixed(1)} kg CO₂ Saved
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
          Your eco actions create a measurable positive impact. Here is what your saved carbon roughly equals.
        </p>
      </div>

      <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-green-400/30 hover:bg-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
                <Icon size={24} />
              </div>

              <p className="text-2xl font-black text-white">
                {item.value}
              </p>

              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}