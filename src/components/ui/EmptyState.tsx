import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-green-400/10 blur-3xl" />

      <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-green-400/10 text-green-400">
        <Icon size={32} />
      </div>

      <h2 className="relative text-xl font-bold text-white">
        {title}
      </h2>

      <p className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-400">
        {description}
      </p>

      {action && (
        <div className="relative mt-6 flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
}