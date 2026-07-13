"use client";

import { motion } from "motion/react";
import {
  BrainCircuit,
  Briefcase,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "AI Resume Score",
    value: "94%",
    icon: BrainCircuit,
    tone: "border-indigo-400/12 bg-indigo-500/8 text-indigo-300",
    change: "Strong ATS readiness",
  },
  {
    title: "Mentors",
    value: "128",
    icon: Users,
    tone: "border-violet-400/12 bg-violet-500/8 text-violet-300",
    change: "Across roles and companies",
  },
  {
    title: "Referrals",
    value: "42",
    icon: Briefcase,
    tone: "border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300",
    change: "Matched opportunities",
  },
  {
    title: "Growth",
    value: "+18%",
    icon: TrendingUp,
    tone: "border-amber-400/12 bg-amber-500/[0.07] text-amber-300",
    change: "Career readiness this month",
  },
];

export default function DashboardPreview() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[150px]" />
      <div className="relative mx-auto max-w-[90rem]">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              Live career intelligence
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-white sm:text-4xl">
              One dashboard. Complete clarity.
            </h2>
          </motion.div>
          <p className="max-w-lg text-sm leading-6 text-slate-500">
            Turn scattered activity into visible progress across readiness, networking,
            referrals, and opportunity growth.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/14 hover:shadow-[var(--shadow-md)] sm:p-6"
              >
                <span className={"flex size-10 items-center justify-center rounded-xl border " + item.tone}>
                  <Icon size={18} />
                </span>
                <p className="mt-6 text-xs font-medium text-slate-500">{item.title}</p>
                <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-white">{item.value}</p>
                <p className="mt-3 text-xs leading-5 text-slate-600">{item.change}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
