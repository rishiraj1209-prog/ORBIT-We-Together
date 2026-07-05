"use client";

import { motion } from "motion/react";
import { GraduationCap, Network, Sparkles, Target } from "lucide-react";

const items = [
  {
    icon: GraduationCap,
    title: "Built for students",
    text: "Orbit understands student profiles, branches, skills and career goals.",
  },
  {
    icon: Target,
    title: "Focused on outcomes",
    text: "Every feature is designed around internships, referrals, roadmaps and readiness.",
  },
  {
    icon: Network,
    title: "Powered by networks",
    text: "Alumni and opportunities become easier to discover through smart matching.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute -left-20 top-24 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            About Orbit
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Designed for students who want more than generic career advice.
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Orbit brings together AI guidance, resume intelligence, roadmaps,
            alumni discovery, referrals and opportunities into one focused career
            workspace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid gap-4"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass flex items-start gap-4 rounded-2xl p-6 transition hover:border-primary/30"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
