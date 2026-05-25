export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-400">
          🌱 EcoTrack
        </h1>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-green-400 transition">
            Features
          </a>

          <a href="#leaderboard" className="hover:text-green-400 transition">
            Leaderboard
          </a>

          <a href="#challenges" className="hover:text-green-400 transition">
            Challenges
          </a>

          <button className="px-5 py-2 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}