interface Props {
  title: string;
  value: string;
  subtitle: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <div className="card-hover bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-white text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-green-400 text-sm mt-2">
        {subtitle}
      </p>

    </div>
  );
}