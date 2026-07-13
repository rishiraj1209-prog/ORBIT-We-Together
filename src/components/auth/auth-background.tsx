"use client";

import { motion } from "framer-motion";

export function AuthBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-background">
      <div className="absolute inset-y-0 left-0 hidden w-[52%] bg-ink lg:block" />
      <div className="absolute inset-y-0 left-[52%] hidden w-px bg-gold/20 lg:block" />
      <div className="absolute -left-56 top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 rounded-full border border-gold/10 lg:block" />
      <div className="absolute -left-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-dashed border-white/10 lg:block" />
      <motion.div className="absolute left-[17%] top-[22%] hidden h-3 w-3 rounded-full bg-gold shadow-[0_0_24px_var(--gold)] lg:block" animate={{ scale: [1, 1.5, 1], opacity: [.5, 1, .5] }} transition={{ duration: 3.4, repeat: Infinity }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_15%,rgba(184,154,99,.1),transparent_28%)]" />
    </div>
  );
}
