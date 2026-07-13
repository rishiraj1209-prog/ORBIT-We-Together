type ProgressProps = {
  value: number;
};

export default function Progress({ value }: ProgressProps) {
  const normalizedValue = Math.max(0, Math.min(value, 100));

  return (
    <div
      role="progressbar"
      aria-label="Progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalizedValue}
      className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/8 shadow-inner shadow-black/20"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_0_18px_rgba(99,102,241,0.35)] transition-[width] duration-700 ease-out"
        style={{ width: `${normalizedValue}%` }}
      />
    </div>
  );
}
