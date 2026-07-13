import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type EmptyStateProps = ComponentProps<"div"> & {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-white/12 bg-white/[0.025] px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300 shadow-sm shadow-indigo-950/25">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export { EmptyState };
