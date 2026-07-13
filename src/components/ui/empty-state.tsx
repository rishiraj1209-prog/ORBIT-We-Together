import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-elevated">
        <Icon className="h-7 w-7 text-text-tertiary" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-text-secondary">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
