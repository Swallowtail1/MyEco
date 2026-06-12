import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#071018] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-400/10 border border-green-400/20">
          <div className="absolute inset-0 rounded-3xl bg-green-400/20 blur-xl animate-pulse" />

          <Leaf className="relative text-green-400 animate-bounce" size={36} />
        </div>

        <h1 className="text-2xl font-bold text-white">
          Loading MyEco
        </h1>

        <p className="mt-2 text-gray-400">
          Preparing your green journey...
        </p>
      </div>
    </div>
  );
}