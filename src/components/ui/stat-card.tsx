import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, change, icon: Icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border/80 hover:bg-surface-elevated/50",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-text-secondary">{label}</p>
        {Icon && (
          <Icon className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
        {value}
      </p>
      {change && (
        <p className="mt-1 text-xs text-success">{change}</p>
      )}
    </div>
  );
}
