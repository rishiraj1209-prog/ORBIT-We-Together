"use client";

import Link from "next/link";
import { Mail, Globe, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 lg:flex-row lg:justify-between">
        <div className="max-w-md">
          <h2 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-3xl font-black text-transparent">
            Orbit
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            AI-powered Career Intelligence Platform helping students connect
            with alumni, mentors, referrals and personalized career guidance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-semibold">Product</h3>

            <div className="space-y-3 text-slate-400">
              <Link href="/">Features</Link>
              <br />
              <Link href="/">AI Copilot</Link>
              <br />
              <Link href="/">Roadmaps</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Company</h3>

            <div className="space-y-3 text-slate-400">
              <Link href="/">About</Link>
              <br />
              <Link href="/">Privacy</Link>
              <br />
              <Link href="/">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Connect</h3>

            <div className="flex gap-4">
              <div className="rounded-xl bg-white/5 p-3">
                <Globe size={20} />
              </div>

              <div className="rounded-xl bg-white/5 p-3">
                <Mail size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <p className="text-sm text-slate-500">
            © 2026 Orbit. All rights reserved.
          </p>

          <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10">
            Back to top
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}