"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { checkAndAwardBadges } from "@/services/badgeService";
import { motion } from "framer-motion";
import AvatarUpload from "@/components/onboarding/AvatarUpload";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function OnboardingForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [campus, setCampus] = useState("");

  const [avatar, setAvatar] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [checkingUsername, setCheckingUsername] = useState(false);

  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null,
  );

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);

    setPreview(URL.createObjectURL(file));
  };

  async function uploadAvatar(userId: string, file: File) {
    const ext = file.name.split(".").pop();

    const fileName = `${userId}/avatar.${ext}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return data.publicUrl;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!username.trim()) {
        throw new Error("Username wajib diisi");
      }

      if (usernameAvailable === false) {
        throw new Error("Username sudah digunakan");
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User tidak ditemukan");
      }

      let avatarUrl = null;

      if (avatar) {
        avatarUrl = await uploadAvatar(user.id, avatar);
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          campus,
          avatar_url: avatarUrl,
          onboarding_completed: true,

          eco_points: 50,
          streak: 1,
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      await checkAndAwardBadges(user.id, 50);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071018] flex items-center justify-center px-6 relative overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-green-500/10 blur-[180px]"
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative w-full max-w-2xl"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Step 1 of 2</span>
              <span>50%</span>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-green-400 rounded-full" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              Welcome To EcoTrack 🌱
            </h1>

            <p className="text-gray-400">
              Complete your profile to start your eco journey.
            </p>
          </div>

          <AvatarUpload preview={preview} onChange={handleAvatarChange} />

          <div className="mt-10 space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-green-400"
              />

              <div className="mt-2 text-sm">
                {checkingUsername && (
                  <p className="text-yellow-400">Checking username...</p>
                )}

                {usernameAvailable === true && (
                  <p className="text-green-400">✓ Username available</p>
                )}

                {usernameAvailable === false && (
                  <p className="text-red-400">✗ Username already taken</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Campus</label>

              <input
                type="text"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                placeholder="Universitas Brawijaya"
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-green-400"
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-8 py-4 rounded-xl bg-green-400 text-black font-semibold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Complete Setup"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
