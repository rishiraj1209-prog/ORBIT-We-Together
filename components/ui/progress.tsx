type ProgressProps = {
  value: number;
};

export default function Progress({ value }: ProgressProps) {
  return (
    <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 transition-all duration-700"
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </div>
  );
}