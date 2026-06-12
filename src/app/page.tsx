import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/landing/Hero";
import LiveStats from "@/components/landing/LiveStats";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import LeaderboardPreview from "@/components/landing/LeaderboardPreview";
import ChallengesPreview from "@/components/landing/ChallengesPreview";
import Mission from "@/components/landing/Mission";
import CTA from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <main className="bg-[#071018] text-white overflow-hidden">
      <Navbar />

      <Hero />
      <LiveStats />
      <Features />
      <HowItWorks />
      <LeaderboardPreview />
      <ChallengesPreview />
      <Mission />
      <CTA />

      <Footer />
    </main>
  );
}