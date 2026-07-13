import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = Omit<ComponentProps<"header">, "title"> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
};

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className
      )}
      {...props}
    >
      <div className="min-w-0">
        {eyebrow && <div className="mb-3">{eyebrow}</div>}
        <h1 className="max-w-4xl text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
    </header>
  );
}

export { PageHeader };
