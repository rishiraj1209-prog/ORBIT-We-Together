import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const controlStyles =
  "w-full rounded-[var(--radius-control)] border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground shadow-inner shadow-black/10 outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-slate-500 hover:border-white/16 focus:border-indigo-400/55 focus:bg-black/25 focus:ring-3 focus:ring-indigo-500/15 disabled:cursor-not-allowed disabled:opacity-55 aria-invalid:border-destructive/60 aria-invalid:ring-destructive/15";

function Field({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function FieldLabel({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-medium text-slate-300", className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-xs leading-5 text-muted-foreground", className)} {...props} />;
}

function FieldError({ className, children, ...props }: ComponentProps<"p">) {
  if (!children) return null;

  return (
    <p role="alert" className={cn("text-xs leading-5 text-red-300", className)} {...props}>
      {children}
    </p>
  );
}

function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlStyles, "h-11", className)} {...props} />;
}

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlStyles, "min-h-28 resize-y", className)} {...props} />;
}

function Select({ className, children, ...props }: ComponentProps<"select"> & { children: ReactNode }) {
  return (
    <select className={cn(controlStyles, "h-11 appearance-none", className)} {...props}>
      {children}
    </select>
  );
}

export { Field, FieldDescription, FieldError, FieldLabel, Input, Select, Textarea };
