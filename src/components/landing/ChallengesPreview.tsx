const challenges = [
  {
    title: "Bike To Campus",
    progress: "65%",
  },
  {
    title: "No Plastic Week",
    progress: "80%",
  },
  {
    title: "Save Electricity",
    progress: "45%",
  },
];

export default function ChallengesPreview() {
  return (
    <section id="challenges" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Weekly Eco Challenges
          </h2>

          <p className="text-gray-400">
            Complete challenges and earn rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-6">
                {challenge.title}
              </h3>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: challenge.progress }}
                />
              </div>

              <p className="text-gray-400">
                {challenge.progress} completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}