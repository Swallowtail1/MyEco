import Image from "next/image";
import { MapPin, Leaf } from "lucide-react";

import LogoutButton from "./LogoutButton";
import EditProfileButton from "./EditProfileButton";

type ProfileHeaderProps = {
  userId: string;
  username: string | null;
  campus: string | null;
  avatarUrl: string | null;
};

export default function ProfileHeader({
  userId,
  username,
  campus,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-green-400/10 border border-green-400/30">
            {avatarUrl?.startsWith("http") ? (
              <Image
                src={avatarUrl}
                alt={username ?? "User Avatar"}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-green-400 font-bold text-4xl">
                {username?.charAt(0).toUpperCase() ?? "U"}
              </div>
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-sm border border-green-400/20 mb-3">
              <Leaf size={14} />
              Eco Warrior
            </div>

            <h1 className="text-3xl font-bold text-white">
              {username ?? "Unknown User"}
            </h1>

            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <MapPin size={16} />
              <span>{campus ?? "No campus"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <EditProfileButton
            userId={userId}
            currentUsername={username}
            currentCampus={campus}
            currentAvatarUrl={avatarUrl}
          />

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}