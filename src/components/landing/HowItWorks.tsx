const steps = [
  "Input Activities",
  "Calculate Carbon Footprint",
  "Earn Eco Points",
  "Climb The Leaderboard",
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-14">
          How EcoTrack Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-green-400 text-black font-bold flex items-center justify-center mb-6 text-xl">
                {index + 1}
              </div>

              <h3 className="font-semibold text-lg">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}