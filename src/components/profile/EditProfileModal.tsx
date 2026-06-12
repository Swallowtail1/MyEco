"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  X,
  Upload,
  Loader2,
  User,
  MapPin,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentUsername: string | null;
  currentCampus: string | null;
  currentAvatarUrl: string | null;
};

export default function EditProfileModal({
  isOpen,
  onClose,
  userId,
  currentUsername,
  currentCampus,
  currentAvatarUrl,
}: EditProfileModalProps) {
  const router = useRouter();

  const [username, setUsername] = useState(
    currentUsername ?? ""
  );

  const [campus, setCampus] = useState(
    currentCampus ?? ""
  );

  const [avatar, setAvatar] =
    useState<File | null>(null);

  const [preview, setPreview] = useState<
    string | null
  >(currentAvatarUrl);

  const [checkingUsername, setCheckingUsername] =
    useState(false);

  const [usernameAvailable, setUsernameAvailable] =
    useState<boolean | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!username.trim()) {
      setUsernameAvailable(null);
      return;
    }

    if (username === currentUsername) {
      setUsernameAvailable(true);
      return;
    }

    const timeout = setTimeout(async () => {
      setCheckingUsername(true);

      const { data } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("username", username)
        .maybeSingle();

      if (!data) {
        setUsernameAvailable(true);
      } else {
        setUsernameAvailable(data.id === userId);
      }

      setCheckingUsername(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [username, currentUsername, userId]);

  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  async function uploadAvatar(
    userId: string,
    file: File
  ) {
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

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

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

      let avatarUrl = currentAvatarUrl;

      if (avatar) {
        avatarUrl = await uploadAvatar(userId, avatar);
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          campus,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) {
        throw error;
      }

      onClose();
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal mengupdate profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-6">
        <Dialog.Panel className="w-full max-w-lg rounded-3xl bg-[#0b1720] border border-white/10 p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Dialog.Title className="text-2xl font-bold">
                Edit Profile
              </Dialog.Title>

              <p className="text-gray-400 text-sm mt-1">
                Update your EcoTrack identity.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-green-400/10 border border-green-400/30">
              {preview?.startsWith("http") ? (
                <Image
                  src={preview}
                  alt="Avatar Preview"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-green-400 text-4xl font-bold">
                  {username.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-400 text-black font-semibold cursor-pointer hover:scale-[1.02] transition">
              <Upload size={16} />
              Change Avatar

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Username
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-green-400"
                />
              </div>

              <div className="mt-2 text-sm">
                {checkingUsername && (
                  <p className="text-yellow-400">
                    Checking username...
                  </p>
                )}

                {usernameAvailable === true && (
                  <p className="text-green-400">
                    ✓ Username available
                  </p>
                )}

                {usernameAvailable === false && (
                  <p className="text-red-400">
                    ✗ Username already taken
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Campus
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  value={campus}
                  onChange={(e) =>
                    setCampus(e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-green-400"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-400 text-black font-semibold hover:scale-[1.02] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}