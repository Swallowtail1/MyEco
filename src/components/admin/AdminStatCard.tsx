import { LucideIcon } from "lucide-react";

type AdminStatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
};

export default function AdminStatCard({
  label,
  value,
  icon: Icon,
  description,
}: AdminStatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-green-400/30 hover:bg-white/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
        <Icon size={24} />
      </div>

      <p className="text-3xl font-black text-white">
        {value}
      </p>

      <p className="mt-2 text-sm font-medium text-gray-300">
        {label}
      </p>

      {description && (
        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}