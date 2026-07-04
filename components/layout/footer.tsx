"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 lg:flex-row lg:justify-between">
        <div className="max-w-md">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400">
              <Sparkles size={20} />
            </div>

            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-400 bg-clip-text text-3xl font-black text-transparent">
              Orbit
            </span>
          </Link>

          <p className="mt-5 leading-7 text-slate-400">
            AI-powered Career Intelligence Platform helping students connect
            profiles, resumes, alumni, roadmaps, referrals and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
          <FooterColumn
            title="Product"
            links={[
              ["Dashboard", "/dashboard"],
              ["AI Copilot", "/ai"],
              ["Resume", "/resume"],
              ["Roadmap", "/roadmap"],
            ]}
          />

          <FooterColumn
            title="Network"
            links={[
              ["Alumni", "/alumni"],
              ["Opportunities", "/opportunities"],
              ["Referrals", "/referrals"],
              ["Notifications", "/notifications"],
            ]}
          />

          <div>
            <h3 className="mb-4 font-semibold">Connect</h3>

            <div className="flex gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Globe size={20} />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Mail size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <p className="text-sm text-slate-500">
            © 2026 Orbit. Built as an AI career intelligence platform.
          </p>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            Back to top
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="mb-4 font-semibold">{title}</h3>

      <div className="space-y-3 text-slate-400">
        {links.map(([label, href]) => (
          <Link key={label} href={href} className="block hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}