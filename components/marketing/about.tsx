"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            About Orbit
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Built to help students achieve their dream careers.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            Orbit is an AI-powered career intelligence platform that combines
            resume analysis, personalized roadmaps, alumni networking,
            referrals, and career insights into one modern workspace. Instead
            of using multiple websites, students can manage their complete
            career journey in a single application.
          </p>
        </motion.div>
      </div>
    </section>
  );
}