import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071018]">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

        <h1 className="text-3xl font-bold text-white mb-4">
          Check Your Email 📧
        </h1>

        <p className="text-gray-400 mb-6">
          We've sent a verification link to your email address.
        </p>

        <Link
          href="/login"
          className="inline-block px-6 py-3 rounded-xl bg-green-400 text-black font-semibold"
        >
          Back to Login
        </Link>

      </div>
    </div>
  );
}