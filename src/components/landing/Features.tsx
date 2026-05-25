"use client";
import { Leaf, Trophy, BarChart3, Target } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Leaf,
    title: "Carbon Tracker",
    description:
      "Track aktivitas harian dan hitung jejak karbonmu.",
  },
  {
    icon: Trophy,
    title: "Eco Leaderboard",
    description:
      "Bersaing dengan user lain dalam menjaga lingkungan.",
  },
  {
    icon: Target,
    title: "Eco Challenges",
    description:
      "Ikuti challenge mingguan dan dapatkan reward.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Visualisasi progress karbon secara realtime.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need To Live Greener
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Semua fitur yang kamu butuhkan untuk membangun kebiasaan
            ramah lingkungan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                y: -10,
                scale: 1.03,
            }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-green-400/40 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                  <Icon className="text-green-400" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}