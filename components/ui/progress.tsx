type ProgressProps = {
  value: number;
};

export default function Progress({ value }: ProgressProps) {
  return (
    <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </div>
  );
}
