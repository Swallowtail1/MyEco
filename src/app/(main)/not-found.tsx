import Link from "next/link";
import { SearchX, Home } from "lucide-react";

export default function MainNotFound() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
        <SearchX size={32} />
      </div>

      <h1 className="text-2xl font-bold text-white">
        Page not found
      </h1>

      <p className="mx-auto mt-3 max-w-lg text-gray-400">
        The dashboard page you are looking for does not exist or may have been moved.
      </p>

      <Link
        href="/dashboard"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
      >
        <Home size={18} />
        Back to Dashboard
      </Link>
    </div>
  );
}