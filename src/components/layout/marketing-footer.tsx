import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/constants/site";

const links = [
  { label: "Intelligence", href: "/#intelligence" }, { label: "Sign in", href: "/login" },
  { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface/45">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><Logo/><p className="mt-5 max-w-md text-sm leading-6 text-text-secondary">{SITE.description}</p></div>
          <nav className="flex flex-wrap gap-x-7 gap-y-3">{links.map(link => <Link key={link.href} href={link.href} className="group flex items-center gap-1 text-xs uppercase tracking-[.12em] text-text-secondary hover:text-text-primary">{link.label}<ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"/></Link>)}</nav>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-border/60 pt-6 text-[11px] uppercase tracking-[.14em] text-text-tertiary sm:flex-row"><p>© {new Date().getFullYear()} Orbit Intelligence</p><p>Private by design · Human by nature</p></div>
      </Container>
    </footer>
  );
}
