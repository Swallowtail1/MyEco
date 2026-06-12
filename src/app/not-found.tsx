import Link from "next/link";
import { Leaf, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#071018] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_35%)]" />

      <div className="relative max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-green-400/10 border border-green-400/20">
          <Leaf className="text-green-400" size={44} />
        </div>

        <p className="text-green-400 font-semibold tracking-[0.3em]">
          404
        </p>

        <h1 className="mt-4 text-4xl md:text-6xl font-black text-white">
          Page Not Found
        </h1>

        <p className="mt-5 text-gray-400 leading-relaxed">
          Looks like this page has wandered off into the forest. The link may be broken, moved, or no longer exists.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
          >
            <Home size={18} />
            Back to Dashboard
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}