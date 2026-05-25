const users = [
  {
    name: "GreenWarrior",
    points: 1250,
  },
  {
    name: "EcoHero",
    points: 1180,
  },
  {
    name: "PlanetSaver",
    points: 1100,
  },
];

export default function LeaderboardPreview() {
  return (
    <section id="leaderboard" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            Community Leaderboard
          </h2>

          <p className="text-gray-400">
            Compete and inspire others to live greener.
          </p>
        </div>

        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-400 text-black font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-gray-400">
                    Eco Points Leader
                  </p>
                </div>
              </div>

              <p className="text-green-400 font-bold text-xl">
                {user.points} pts
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}