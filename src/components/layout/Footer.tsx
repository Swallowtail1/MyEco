export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-2xl font-bold text-green-400">
          🌱 MyEco
        </h2>

        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="#">About</a>
          <a href="#">Github</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}