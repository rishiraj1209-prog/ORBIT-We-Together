"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  CheckCircle2,
  LockKeyhole,
  LogOut,
  Mail,
  Settings,
  Shield,
  Sparkles,
  User,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { auth } from "@/lib/firebase";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();

  async function logout() {
    await signOut(auth);
    router.push("/");
  }

  const initials = (user?.displayName || "Orbit User")
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[82rem] space-y-6 lg:space-y-8">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              <Settings size={14} />
              Account Settings
            </span>
          }
          title="Manage your account."
          description="View your profile identity, authentication status, and account security."
        />

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <Card className="relative overflow-hidden border-indigo-400/12 shadow-[var(--shadow-md)]">
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-indigo-500/12 blur-3xl" />
            <div className="relative flex flex-col gap-5 border-b border-white/8 bg-gradient-to-r from-indigo-500/[0.07] via-violet-500/[0.025] to-transparent px-5 py-6 sm:flex-row sm:items-center sm:px-7">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-xl font-bold text-white shadow-xl shadow-indigo-950/40">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300">
                  Orbit account
                </p>
                <h2 className="mt-1 truncate text-2xl font-semibold tracking-tight text-white">
                  {user?.displayName || "Orbit User"}
                </h2>
                <p className="mt-2 flex min-w-0 items-center gap-2 text-sm text-slate-500">
                  <Mail size={15} className="shrink-0" />
                  <span className="truncate">{user?.email || "Not signed in"}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3 p-5 sm:p-7">
              <AccountStatus
                icon={Shield}
                title="Firebase Authentication"
                description="Your account is protected using Firebase Authentication."
                status="Connected"
                tone="border-indigo-400/12 bg-indigo-500/8 text-indigo-300"
              />
              <AccountStatus
                icon={CheckCircle2}
                title="Email Verification"
                description={
                  user?.emailVerified
                    ? "Your email has been verified."
                    : "Email verification is pending."
                }
                status={user?.emailVerified ? "Verified" : "Pending"}
                tone={
                  user?.emailVerified
                    ? "border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300"
                    : "border-amber-400/12 bg-amber-500/[0.07] text-amber-300"
                }
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-white/8 bg-white/[0.015] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <p className="text-xs leading-5 text-slate-600">
                Signing out returns you to the Orbit home page.
              </p>
              <Button variant="destructive" size="lg" onClick={logout}>
                <LogOut />
                Logout
              </Button>
            </div>
          </Card>

          <aside className="space-y-4">
            <StatusCard
              icon={Sparkles}
              eyebrow="Platform status"
              title="Orbit connected"
              description="Your account is connected to the Orbit AI Career Intelligence Platform."
              badge="Active"
              tone="border-violet-400/12 bg-violet-500/8 text-violet-300"
            />
            <StatusCard
              icon={LockKeyhole}
              eyebrow="Security"
              title="Protected workspace"
              description="Authentication, database access, and storage are protected using Firebase Security Rules."
              tone="border-cyan-400/12 bg-cyan-500/[0.07] text-cyan-300"
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function AccountStatus({
  icon: Icon,
  title,
  description,
  status,
  tone,
}: {
  icon: typeof User;
  title: string;
  description: string;
  status: string;
  tone: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <span className={"flex size-9 shrink-0 items-center justify-center rounded-xl border " + tone}>
        <Icon size={17} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-slate-200">{title}</h3>
          <span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {status}
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-5 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function StatusCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  badge,
  tone,
}: {
  icon: typeof Sparkles;
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  tone: string;
}) {
  return (
    <Card className="p-5 sm:p-6">
      <span className={"flex size-10 items-center justify-center rounded-xl border " + tone}>
        <Icon size={18} />
      </span>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-200">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      {badge && (
        <div className="mt-5 flex items-center justify-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-500/[0.05] px-3 py-2 text-xs font-semibold text-cyan-200">
          <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          {badge}
        </div>
      )}
    </Card>
  );
}
