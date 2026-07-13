"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export function Dialog({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  children,
  asChild,
}: {
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  asChild?: boolean;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogTrigger must be used within Dialog");

  const child = React.Children.only(children);
  const props = {
    onClick: (e: React.MouseEvent) => {
      child.props.onClick?.(e);
      ctx.setOpen(true);
    },
  };

  return asChild ? (
    React.cloneElement(child, props)
  ) : (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx?.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => ctx.setOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-50 w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex flex-col gap-1.5", className)}>{children}</div>
  );
}

export function DialogTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-lg font-semibold text-text-primary", className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-text-secondary", className)}>{children}</p>
  );
}

export function DialogClose({
  children,
  className,
}: {
  children: React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
  }>;
  className?: string;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogClose must be used within Dialog");

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      ctx.setOpen(false);
    },
    className: cn(children.props.className, className),
  });
}

export function useDialog() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within Dialog");
  return ctx;
}
