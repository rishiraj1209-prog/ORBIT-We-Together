"use client";

import { motion } from "motion/react";
import { GraduationCap, Network, Sparkles, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-32">
      <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-green-500/10 blur-[110px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Sparkles size={16} />
            About Orbit
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Designed for students who want more than generic career advice.
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            Orbit brings together AI guidance, resume intelligence, roadmaps,
            alumni discovery, referrals and opportunities into one focused
            career workspace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="green-glass rounded-[2.5rem] p-8"
        >
          <div className="grid gap-5">
            {[
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
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6"
                >
                  <Icon className="mb-4 text-green-300" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{item.text}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}