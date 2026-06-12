"use client";

import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-[#071018] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="text-red-400" size={44} />
        </div>

        <p className="text-red-400 font-semibold tracking-[0.3em]">
          ERROR
        </p>

        <h1 className="mt-4 text-4xl md:text-5xl font-black text-white">
          Something went wrong
        </h1>

        <p className="mt-5 text-gray-400 leading-relaxed">
          MyEco ran into a problem while loading this page. You can try again or return to the dashboard.
        </p>

        {error?.message && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Error Message
            </p>

            <p className="mt-2 text-sm text-gray-300 break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}