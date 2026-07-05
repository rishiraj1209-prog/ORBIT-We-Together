"use client";

import { motion } from "motion/react";
import {
  BrainCircuit,
  Briefcase,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  { title: "AI Resume Score", value: "94%", icon: BrainCircuit, detail: "+6 this week" },
  { title: "Mentors", value: "128", icon: Users, detail: "12 new matches" },
  { title: "Referrals", value: "42", icon: Briefcase, detail: "8 in progress" },
  { title: "Growth", value: "+18%", icon: TrendingUp, detail: "vs. last month" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function DashboardPreview() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Live dashboard
          </p>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Your entire career, at a glance.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Track readiness, mentors, referrals and momentum in one focused view
            that updates as you grow.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 transition group-hover:bg-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.detail}
                  </span>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">{item.title}</p>
                <p className="mt-1.5 font-display text-4xl font-bold tracking-tight">
                  {item.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
