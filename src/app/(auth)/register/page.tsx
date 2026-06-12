"use client";

import { useEffect, useState } from "react";

import { Eye, EyeOff, User, Mail, Lock, Leaf } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const supabase = createClient();

  const router = useRouter();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const getPasswordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const getStrengthLabel = () => {
    if (strength <= 1) return "Weak";
    if (strength <= 2) return "Medium";
    if (strength <= 3) return "Strong";
    return "Very Strong";
  };

  const [checkingUsername, setCheckingUsername] = useState(false);

  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null,
  );

  const strength = getPasswordStrength();

  useEffect(() => {
    if (!username.trim()) {
      setUsernameAvailable(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setCheckingUsername(true);

      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();

      setUsernameAvailable(!data);

      setCheckingUsername(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

  const handleRegister = async () => {
    setError("");

    if (!username.trim()) {
      setError("Username wajib diisi");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password tidak sama");
      return;
    }

    if (strength < 3) {
      setError("Password terlalu lemah");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    console.log(data);

    setSuccess(true);
    router.push("/verify");
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071018] px-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <Leaf className="text-green-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Account Created 🎉
          </h1>

          <p className="text-gray-400">
            Silakan cek email untuk verifikasi akunmu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="min-h-screen bg-[#071018] flex items-center justify-center px-6"
    >
      {/* Glow Effect */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[150px] rounded-full"
      />

      <div className="relative w-full max-w-md">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>

          <p className="text-gray-400 mb-8">
            Join EcoTrack and start your eco journey 🌱
          </p>

          {/* Username */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Username</label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-green-400"
              />
            </div>
          </div>

          {checkingUsername && (
            <p className="text-yellow-400 text-sm mt-2">Checking username...</p>
          )}

          {usernameAvailable === true && (
            <p className="text-green-400 text-sm mt-2">✓ Username available</p>
          )}

          {usernameAvailable === false && (
            <p className="text-red-400 text-sm mt-2">
              ✗ Username already taken
            </p>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Email</label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-green-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Password</label>

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

            {/* Strength */}
            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-2 flex-1 rounded-full ${
                    strength >= item ? "bg-green-400" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Strength:
              <span className="text-green-400 ml-2">{getStrengthLabel()}</span>
            </p>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-green-400"
            />
          </div>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3">
              {error}
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-400 text-black font-semibold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <button
            onClick={loginWithGoogle}
            className="w-full mt-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white"
          >
            Continue with Google
          </button>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?
            <a href="/login" className="text-green-400 ml-2">
              Login
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
