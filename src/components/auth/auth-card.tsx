"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-[28px] border border-border/70 bg-surface/85 p-8 shadow-[0_28px_80px_rgba(0,0,0,.13)] backdrop-blur-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-br before:from-white/5 before:to-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
