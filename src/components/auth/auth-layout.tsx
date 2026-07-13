"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuthBackground } from "@/components/auth/auth-background";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <AuthBackground />

      <div className="relative flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-6 sm:px-8 lg:px-12">
          <Logo className="lg:[&_span:last-child]:text-[#f3efe6]" />
          <ThemeToggle />
        </header>

        <div className="flex flex-1 flex-col lg:flex-row">
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className={cn(
              "hidden flex-1 flex-col justify-center px-8 pb-12 text-[#f3efe6] lg:flex lg:w-[52%] lg:flex-none lg:px-16 xl:px-24"
            )}
          >
            <div className="max-w-lg">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {SITE.name} · Verified alumni network
              </div>

              <h1 className="font-display text-5xl leading-[1.02] text-[#f3efe6] xl:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-[#aaa99f]">
                {subtitle}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { label: "Verified", value: "100%" },
                  { label: "Setup time", value: "< 3 min" },
                  { label: "Match quality", value: "89%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[.035] p-4 backdrop-blur-sm"
                  >
                    <p className="text-xl font-medium text-[#f3efe6]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] text-[#777a72]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <main className="flex flex-1 items-center justify-center px-6 py-8 sm:px-8 lg:px-16">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:hidden">
                <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
              </div>
              {children}
            </div>
          </main>
        </div>

        <footer className="px-6 py-4 text-center text-xs text-text-tertiary sm:px-8">
          By continuing, you agree to Orbit&apos;s{" "}
          <Link href="#" className="text-text-secondary hover:text-text-primary">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-text-secondary hover:text-text-primary">
            Privacy Policy
          </Link>
          .
        </footer>
      </div>
    </div>
  );
}
