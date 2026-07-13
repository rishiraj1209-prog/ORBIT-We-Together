import { Logo } from "@/components/layout/logo";

export function OrbitLoader({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex min-h-[420px] items-center justify-center" : "fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-background"} role="status" aria-label="Loading Orbit">
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-gold/25" />
          <div className="animate-orbit-spin absolute inset-3 rounded-full border border-transparent border-t-gold/90 border-r-gold/20" />
          <div className="animate-orbit-spin absolute inset-7 rounded-full border border-transparent border-b-accent/80" style={{ animationDirection: "reverse", animationDuration: "9s" }} />
          <span className="animate-orbit-pulse h-5 w-5 rounded-full bg-text-primary shadow-[0_0_30px_rgba(200,169,108,.4)]" />
          <span className="absolute right-[12px] top-1/2 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_16px_var(--gold)]" />
        </div>
        <Logo className="mt-5 pointer-events-none" />
        <p className="mt-4 text-[10px] uppercase tracking-[.28em] text-text-tertiary">Aligning your constellation</p>
      </div>
    </div>
  );
}
