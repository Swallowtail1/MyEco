"use client";

import Image from "next/image";

interface AvatarUploadProps {
  preview: string | null;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function AvatarUpload({
  preview,
  onChange,
}: AvatarUploadProps) {
  return (
    <div className="flex flex-col items-center">

      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-green-400 bg-white/5">

        {preview ? (
          <Image
            src={preview}
            alt="avatar"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Avatar
          </div>
        )}
      </div>

      <label className="mt-4 cursor-pointer px-4 py-2 rounded-xl bg-green-400 text-black font-medium hover:scale-105 transition">
        Upload Photo

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={onChange}
        />
      </label>

    </div>
  );
}