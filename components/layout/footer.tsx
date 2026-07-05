"use client";

import Link from "next/link";
import { ArrowUpRight,Globe, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative justify content:around overflow-hidden border-t border-white/10 bg-[#020617]/95">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-green-500/10 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 shadow-lg shadow-green-500/25">
              <Sparkles className="text-slate-950" size={22} />
            </div>

            <span className="text-3xl font-black text-white">Orbit</span>
          </Link>

          <p className="mt-6 max-w-md leading-7 text-slate-400">
            AI-powered career intelligence platform helping students turn
            profiles, resumes, roadmaps, alumni and opportunities into one
            focused career system.
          </p>

          <div className="mt-7 flex gap-4">
            <a
              href="https://orbit-we-together.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-green-400/40 hover:bg-green-500/10"
            >
              <Globe size={20} />
            </a>

            <a
              href="mailto:rishi12.09.2006rajsharma@gmail.com"
              className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-green-400/40 hover:bg-green-500/10"
            >
              <Mail size={20} />
            </a>

           
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
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

          <FooterColumn
            title="Start"
            links={[
              ["Login", "/login"],
              ["Signup", "/signup"],
              ["Settings", "/settings"],
              ["Top", "#top"],
            ]}
          />
        </div>
      </div>

      <div className="relative border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Orbit. Built as an AI career intelligence platform.</p>

          <a
            href="#top"
            className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-300 transition hover:border-green-400/40 hover:bg-green-500/10"
          >
            Back to top
            <ArrowUpRight size={16} />
          </a>
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
      <h3 className="mb-4 font-semibold text-white">{title}</h3>

      <div className="space-y-3">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="block text-slate-400 transition hover:text-green-300"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}