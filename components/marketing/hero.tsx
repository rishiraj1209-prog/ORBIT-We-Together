"use client";

import { motion } from "motion/react";
import AnimatedBackground from "./animated-background";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      <AnimatedBackground />

      <div className="max-w-6xl mx-auto text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 backdrop-blur-xl">
            🚀 AI Powered Career Intelligence Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2, duration: .8 }}
          className="mt-8 text-6xl md:text-8xl font-black tracking-tight"
        >
          Build Your
          <br />

          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Dream Career
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:.5 }}
          className="mt-8 text-slate-400 text-xl max-w-3xl mx-auto leading-9"
        >
          Orbit combines AI, alumni networking, mentorship,
          resume analysis, referrals and career planning into
          one beautiful platform built for ambitious students.
        </motion.p>

        <motion.div
          initial={{ opacity:0,y:20 }}
          animate={{ opacity:1,y:0 }}
          transition={{ delay:.8 }}
          className="mt-12 flex justify-center gap-5 flex-wrap"
        >

          <button className="rounded-xl bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 font-semibold">
            Launch Orbit
          </button>

          <button className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition px-8 py-4">
            Watch Demo
          </button>

        </motion.div>

      </div>

    </section>
  );
}
