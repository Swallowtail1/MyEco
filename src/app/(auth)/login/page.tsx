"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [startAnimation, setStartAnimation] = useState(false);

  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/auth/redirect";

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push(next);
        router.refresh();
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    // Begitu masuk halaman (termasuk saat user menekan tombol BACK),
    // durasi setTimeout tipis ini akan memaksa animasi opacity berjalan ulang dengan aman
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  router.push(next);
  router.refresh();
};

  const loginWithGoogle = async () => {
    const redirectUrl = new URL("/auth/callback", window.location.origin);

    redirectUrl.searchParams.set("next", next);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl.toString(),
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#071018] flex items-center justify-center px-6">
      <motion.div
        className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[150px] rounded-full"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: startAnimation ? 1 : 0,
          y: startAnimation ? 0 : 40,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>

          <p className="text-gray-400 mb-8">
            Login to continue your eco journey 🌱
          </p>

          {/* EMAIL */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Email</label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-green-400"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white outline-none focus:border-green-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-400 text-black font-semibold hover:scale-[1.02] transition"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

            <button
              onClick={loginWithGoogle}
              className="w-full mt-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white"
            >
              <span className="mr-2 inline-flex items-center gap-2">
                <FcGoogle className="w-5 h-5 " />
                Continue with Google
              </span>
            </button>
          </form>
          <div className="flex justify-between mt-6 text-sm">
            <a href="/forgot-password" className="text-gray-400">
              Forgot Password?
            </a>

            <a href="/register" className="text-green-400">
              Create Account
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
