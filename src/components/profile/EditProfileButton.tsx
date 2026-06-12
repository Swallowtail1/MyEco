"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import EditProfileModal from "./EditProfileModal";

type EditProfileButtonProps = {
  userId: string;
  currentUsername: string | null;
  currentCampus: string | null;
  currentAvatarUrl: string | null;
};

export default function EditProfileButton({
  userId,
  currentUsername,
  currentCampus,
  currentAvatarUrl,
}: EditProfileButtonProps) {
  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition"
      >
        <Pencil size={18} />
        Edit Profile
      </button>

      <EditProfileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userId={userId}
        currentUsername={currentUsername}
        currentCampus={currentCampus}
        currentAvatarUrl={currentAvatarUrl}
      />
    </>
  );
}