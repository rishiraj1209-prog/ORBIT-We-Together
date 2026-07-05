"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Mail, Orbit } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 hairline" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
              <Orbit className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-2xl font-bold">Orbit</span>
          </Link>

          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            AI-powered career intelligence platform helping students turn
            profiles, resumes, roadmaps, alumni and opportunities into one focused
            career system.
          </p>

          <div className="mt-7 flex gap-3">
            <a
              href="https://orbit-we-together.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/5 text-muted-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <Globe className="h-5 w-5" />
            </a>
            <a
              href="mailto:rishi12.09.2006rajsharma@gmail.com"
              aria-label="Email"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/5 text-muted-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
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

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Orbit. Built as an AI career intelligence platform.</p>
          <a
            href="#top"
            className="flex w-fit items-center gap-2 rounded-xl border border-border bg-white/5 px-4 py-2 text-foreground transition hover:border-primary/40 hover:bg-primary/10"
          >
            Back to top
            <ArrowUpRight className="h-4 w-4" />
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
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <div className="space-y-3">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="block text-sm text-muted-foreground transition hover:text-primary"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
