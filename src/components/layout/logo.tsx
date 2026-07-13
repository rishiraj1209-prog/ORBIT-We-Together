import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface LogoProps { className?: string; showWordmark?: boolean; }

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)} aria-label="Orbit home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-ink text-[#efe9dc] shadow-[inset_0_0_0_4px_rgba(255,255,255,.025)]">
        <svg viewBox="0 0 36 36" fill="none" className="h-7 w-7" aria-hidden="true">
          <ellipse cx="18" cy="18" rx="13" ry="6.5" className="stroke-gold" strokeWidth="1.1" transform="rotate(-25 18 18)" />
          <ellipse cx="18" cy="18" rx="13" ry="6.5" className="stroke-[#efe9dc]/50" strokeWidth="1" transform="rotate(25 18 18)" />
          <circle cx="18" cy="18" r="3.8" className="fill-[#efe9dc]" />
          <circle cx="29.5" cy="12.2" r="1.6" className="fill-gold" />
        </svg>
      </span>
      {showWordmark && <span className="text-[19px] font-medium tracking-[-0.045em] text-text-primary">ORBIT</span>}
    </Link>
  );
}
