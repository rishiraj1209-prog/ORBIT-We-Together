import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Orbit, ShieldCheck, Sparkles } from "lucide-react";

type AuthShellProps = {
  children: ReactNode;
  badge: string;
  marketingTitle: ReactNode;
  marketingDescription: string;
  formIcon: ReactNode;
  formTitle: string;
  formDescription: string;
};

export function AuthShell({
  children,
  badge,
  marketingTitle,
  marketingDescription,
  formIcon,
  formTitle,
  formDescription,
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-6 text-white sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute left-[8%] top-[4%] size-[28rem] rounded-full bg-indigo-600/16 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[4%] size-[28rem] rounded-full bg-violet-600/12 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.045] blur-[150px]" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/72 shadow-[var(--shadow-lg)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden min-h-[42rem] overflow-hidden border-r border-white/8 bg-gradient-to-br from-indigo-500/10 via-violet-500/[0.045] to-transparent p-9 lg:flex lg:flex-col xl:p-11">
          <div className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full bg-indigo-500/18 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <Link href="/" className="relative flex w-fit items-center gap-3 rounded-xl">
            <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-950/40">
              <Orbit size={19} />
            </span>
            <span className="text-xl font-bold tracking-tight">Orbit</span>
          </Link>

          <div className="relative my-auto py-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/14 bg-indigo-500/8 px-3 py-2 text-xs font-semibold text-indigo-200">
              <Sparkles size={14} />
              {badge}
            </p>
            <h1 className="mt-6 max-w-lg text-4xl font-bold tracking-[-0.045em] text-white xl:text-5xl">
              {marketingTitle}
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
              {marketingDescription}
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <span className="flex size-9 items-center justify-center rounded-xl border border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300">
              <ShieldCheck size={17} />
            </span>
            <div>
              <p className="text-xs font-medium text-slate-300">Secure authentication</p>
              <p className="mt-0.5 text-[10px] text-slate-600">Protected by Firebase Authentication</p>
            </div>
          </div>
        </section>

        <section className="p-5 sm:p-8 md:p-10 lg:p-11">
          <div className="mx-auto max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link href="/" className="flex items-center gap-2.5 rounded-xl">
                <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-950/40">
                  <Orbit size={17} />
                </span>
                <span className="text-lg font-bold tracking-tight">Orbit</span>
              </Link>
              <Link
                href="/"
                aria-label="Back to home"
                className="flex size-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft size={17} />
              </Link>
            </div>

            <div className="mb-7">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-indigo-400/12 bg-indigo-500/10 text-indigo-300">
                {formIcon}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-white">{formTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{formDescription}</p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
