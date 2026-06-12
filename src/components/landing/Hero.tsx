"use client";
import { motion } from "framer-motion";
import LandingActions from "./LandingActions";
import { Leaf, Globe, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24">
      <motion.div
       initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
       className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm mb-6">
            <Leaf size={16} />
            Sustainable Future Starts Here
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Track Your
            <span className="text-green-400"> Carbon </span>
            Footprint.
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8">
            MyEco membantu generasi muda memahami dan mengurangi
            jejak karbon melalui activity tracking, leaderboard,
            dan eco challenges.
          </p>

          <div className="flex flex-wrap gap-4">
              <LandingActions />

            <button className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              Explore Features
            </button>
          </div>
        </div>

        <motion.div 
        animate={{
            y: [0, -15, 0],
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="relative flex items-center justify-center">
          <div className="absolute w-[450px] h-[450px] rounded-full bg-green-500/20 blur-3xl" />

          <div className="relative w-[320px] h-[320px] rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center shadow-[0_0_80px_rgba(34,197,94,0.5)]">
            <Globe size={140} className="text-white" />
          </div>

          <div className="absolute top-10 left-0 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
            <Leaf className="text-green-400" />
          </div>

          <div className="absolute bottom-16 right-0 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
            <Zap className="text-cyan-400" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}