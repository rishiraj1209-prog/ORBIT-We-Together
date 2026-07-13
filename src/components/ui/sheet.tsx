"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

export function Sheet({
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
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  children,
}: {
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
}) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("SheetTrigger must be used within Sheet");

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      ctx.setOpen(true);
    },
  });
}

export function SheetContent({
  children,
  side = "left",
  className,
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  const ctx = React.useContext(SheetContext);
  if (!ctx?.open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => ctx.setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-y-0 z-50 w-72 border-border bg-surface shadow-2xl transition-transform duration-300",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
          className
        )}
      >
        <button
          type="button"
          onClick={() => ctx.setOpen(false)}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function useSheet() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("useSheet must be used within Sheet");
  return ctx;
}
