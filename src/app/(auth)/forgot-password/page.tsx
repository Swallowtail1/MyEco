"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {

  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            `${window.location.origin}/auth/callback`,
        }
      );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#071018] flex justify-center items-center px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

        <h1 className="text-3xl font-bold text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-400 mb-6">
          Enter your email and we'll send a reset link.
        </p>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl">
            Password reset link has been sent.
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 mb-4"
            />

            {error && (
              <div className="mb-4 text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-400 text-black font-semibold"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}