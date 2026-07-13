"use client";

import { motion } from "motion/react";
import { GraduationCap, Network, Sparkles, Target } from "lucide-react";

const principles = [
  {
    icon: GraduationCap,
    title: "Built for students",
    text: "Orbit understands student profiles, branches, skills, and career goals.",
    tone: "border-indigo-400/12 bg-indigo-500/8 text-indigo-300",
  },
  {
    icon: Target,
    title: "Focused on outcomes",
    text: "Every feature is designed around internships, referrals, roadmaps, and readiness.",
    tone: "border-violet-400/12 bg-violet-500/8 text-violet-300",
  },
  {
    icon: Network,
    title: "Powered by networks",
    text: "Alumni and opportunities become easier to discover through smart matching.",
    tone: "border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="pointer-events-none absolute -right-32 top-1/3 size-96 rounded-full bg-violet-600/[0.08] blur-[140px]" />
      <div className="relative mx-auto grid max-w-[90rem] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/14 bg-indigo-500/8 px-3 py-2 text-xs font-semibold text-indigo-200">
            <Sparkles size={14} />
            About Orbit
          </p>
          <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            More than generic career advice.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500">
            Orbit brings together AI guidance, resume intelligence, roadmaps,
            alumni discovery, referrals, and opportunities into one focused
            career workspace.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs text-slate-600">
            <span className="h-px w-10 bg-gradient-to-r from-indigo-400 to-cyan-400" />
            Built around action, not information overload.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.025] shadow-[var(--shadow-md)]"
        >
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={
                  "flex gap-4 p-5 sm:p-6 " +
                  (index < principles.length - 1 ? "border-b border-white/8" : "")
                }
              >
                <span className={"flex size-10 shrink-0 items-center justify-center rounded-xl border " + item.tone}>
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-200">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
