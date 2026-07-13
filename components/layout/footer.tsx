import Link from "next/link";
import { ArrowUpRight, Globe, Mail, Orbit } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-slate-950/70">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-300/45 to-transparent" />
      <div className="relative mx-auto grid max-w-[90rem] gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-10">
        <div>
          <Link href="/" className="flex w-fit items-center gap-2.5 rounded-xl">
            <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-950/40">
              <Orbit size={18} />
            </span>
            <span className="text-xl font-bold tracking-tight text-white">Orbit</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-500">
            AI-powered career intelligence helping students turn profiles, resumes,
            roadmaps, alumni, and opportunities into one focused system.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://orbit-we-together.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Orbit live website"
              className="flex size-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Globe size={16} />
            </a>
            <a
              href="mailto:rishi12.09.2006rajsharma@gmail.com"
              aria-label="Email the Orbit team"
              className="flex size-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterColumn title="Product" links={[["Dashboard", "/dashboard"], ["AI Copilot", "/ai"], ["Resume", "/resume"], ["Roadmap", "/roadmap"]]} />
          <FooterColumn title="Network" links={[["Alumni", "/alumni"], ["Opportunities", "/opportunities"], ["Referrals", "/referrals"], ["Notifications", "/notifications"]]} />
          <FooterColumn title="Start" links={[["Login", "/login"], ["Signup", "/signup"], ["Settings", "/settings"], ["Top", "#top"]]} />
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-3 px-5 py-5 text-xs text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>© 2026 Orbit. AI career intelligence platform.</p>
          <a href="#top" className="flex w-fit items-center gap-1.5 transition hover:text-slate-400">
            Back to top
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{title}</h3>
      <div className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <Link key={label} href={href} className="block text-sm text-slate-600 transition hover:text-indigo-300">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
