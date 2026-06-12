"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default async function ResetPasswordPage() {
    
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const router = useRouter();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak sama");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#071018] flex justify-center items-center px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>

        <p className="text-gray-400 mb-6">Create your new password.</p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 mb-4"
        />

        {error && <div className="mb-4 text-red-400">{error}</div>}

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-green-400 text-black font-semibold"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
