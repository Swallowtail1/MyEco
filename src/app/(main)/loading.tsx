import { Leaf } from "lucide-react";

export default function MainLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-48 rounded-xl bg-white/10 animate-pulse" />
        <div className="mt-3 h-4 w-72 rounded-xl bg-white/5 animate-pulse" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-3xl border border-white/10 bg-white/5 animate-pulse"
          />
        ))}
      </div>

      <div className="h-80 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="h-72 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />
        <div className="h-72 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}