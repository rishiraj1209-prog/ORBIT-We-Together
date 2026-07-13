"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  BellOff,
  BrainCircuit,
  Briefcase,
  ChevronRight,
  FileText,
  GraduationCap,
  LogOut,
  Network,
  Route,
  Sparkles,
  Target,
} from "lucide-react";
import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/providers/auth-provider";
import { getUserProfile, UserProfile } from "@/lib/profile";
import { getDashboardStats } from "@/lib/dashboard";
import { getNotifications, Notification } from "@/lib/notifications";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import Progress from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    label: "Analyze Resume",
    description: "Get ATS-style feedback",
    path: "/resume",
    icon: FileText,
  },
  {
    label: "Ask AI",
    description: "Get personalized guidance",
    path: "/ai",
    icon: BrainCircuit,
  },
  {
    label: "Generate Roadmap",
    description: "Plan your next milestones",
    path: "/roadmap",
    icon: Route,
  },
  {
    label: "Find Alumni",
    description: "Grow your career network",
    path: "/alumni",
    icon: Network,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    async function loadDashboard() {
      if (!user) {
        setProfileLoading(false);
        return;
      }

      const profileData = await getUserProfile(user.uid);
      const recent = await getNotifications(user.uid);

      setProfile(profileData);
      setNotifications(recent.slice(0, 4));
      setProfileLoading(false);
    }

    loadDashboard();
  }, [user]);

  async function logout() {
    await signOut(auth);
    router.push("/");
  }

  if (loading || profileLoading) {
    return <DashboardSkeleton />;
  }

  const stats = getDashboardStats(profile);

  const name = profile?.name || user?.displayName || "Student";
  const branch = profile?.branch || "Not added";
  const skills = profile?.skills || "Not added";

  const cards = [
    {
      title: "Profile Completion",
      value: stats.profileCompletion + "%",
      icon: Target,
      progress: stats.profileCompletion,
      text:
        stats.profileCompletion === 100
          ? "Your profile is complete and ready for stronger AI matching."
          : "Complete your profile to unlock stronger recommendations.",
      tone: "from-indigo-500/16 to-indigo-500/[0.025]",
      iconTone: "border-indigo-400/15 bg-indigo-500/12 text-indigo-300",
    },
    {
      title: "AI Readiness",
      value: stats.aiReadiness + "%",
      icon: BrainCircuit,
      progress: stats.aiReadiness,
      text: stats.skillsCount + " skills detected in your profile.",
      tone: "from-violet-500/16 to-violet-500/[0.025]",
      iconTone: "border-violet-400/15 bg-violet-500/12 text-violet-300",
    },
    {
      title: "Career Goal",
      value: stats.careerGoal,
      icon: Briefcase,
      progress: null,
      text:
        stats.careerGoal === "Not Set"
          ? "Add your dream company to personalize Orbit AI."
          : "Orbit is optimizing your roadmap around this goal.",
      tone: "from-cyan-500/14 to-cyan-500/[0.02]",
      iconTone: "border-cyan-400/15 bg-cyan-500/10 text-cyan-300",
    },
  ];

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[90rem] space-y-6 lg:space-y-8">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              Career Mission Control
            </span>
          }
          title={
            <>
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                {name}
              </span>
            </>
          }
          description="Your personalized view of career readiness, recent progress, and the next best actions to take."
          actions={
            <>
              <Button variant="outline" onClick={() => router.push("/notifications")}>
                <Bell />
                Alerts
              </Button>
              <Button variant="destructive" onClick={logout}>
                <LogOut />
                Logout
              </Button>
            </>
          }
        />

        <Card className="relative overflow-hidden border-indigo-400/15 bg-gradient-to-br from-indigo-500/14 via-violet-500/[0.055] to-cyan-500/[0.025] p-6 shadow-[var(--shadow-md)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-indigo-500/18 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 size-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] lg:items-center lg:gap-12">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/15 bg-indigo-500/10 px-3.5 py-2 text-xs font-semibold text-indigo-200 shadow-sm shadow-indigo-950/20">
                <Sparkles size={14} />
                Orbit AI Insight
              </p>

              <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                You are {stats.aiReadiness}% career-ready.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Orbit is building your personalized career graph using your profile,
                skills, resume, roadmap, alumni network, and referral opportunities.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button variant="gradient" size="lg" onClick={() => router.push("/profile")}>
                  Complete Profile
                  <ChevronRight />
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/roadmap")}>
                  <Route />
                  Generate Roadmap
                </Button>
              </div>
            </div>

            <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-6 shadow-inner shadow-black/25 backdrop-blur-xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    AI Readiness
                  </p>
                  <p className="mt-3 text-5xl font-bold tracking-[-0.05em] text-white sm:text-6xl">
                    {stats.aiReadiness}
                    <span className="ml-1 text-2xl font-medium text-slate-500">%</span>
                  </p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/12 text-violet-300 shadow-lg shadow-violet-950/20">
                  <BrainCircuit size={22} />
                </span>
              </div>

              <Progress value={stats.aiReadiness} />

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/8 pt-5">
                <div>
                  <p className="text-xs text-slate-500">Skills detected</p>
                  <p className="mt-1 text-lg font-semibold text-slate-200">{stats.skillsCount}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Profile</p>
                  <p className="mt-1 text-lg font-semibold text-slate-200">
                    {stats.profileCompletion}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <section aria-labelledby="overview-title">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="overview-title" className="text-lg font-semibold tracking-tight text-white">
              Career overview
            </h2>
            <span className="text-xs text-slate-500">Updated from your profile</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <Card
                  key={card.title}
                  className={cn(
                    "group relative overflow-hidden bg-gradient-to-br p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[var(--shadow-md)] sm:p-6",
                    card.tone
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={cn("flex size-10 items-center justify-center rounded-xl border", card.iconTone)}>
                      <Icon size={19} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                      Overview
                    </span>
                  </div>

                  <p className="mt-6 text-sm font-medium text-slate-400">{card.title}</p>
                  <h3 className="mt-2 break-words text-3xl font-bold tracking-[-0.035em] text-white">
                    {card.value}
                  </h3>

                  {card.progress !== null && <Progress value={card.progress} />}

                  <p className="mt-4 text-sm leading-6 text-slate-500">{card.text}</p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-white">Recent activity</h2>
                <p className="mt-1 text-sm text-slate-500">Your latest updates across Orbit.</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/notifications")}
                className="hidden sm:inline-flex"
              >
                View all
                <ChevronRight />
              </Button>
            </div>

            <div className="mt-6">
              {notifications.length === 0 ? (
                <EmptyState
                  icon={<BellOff size={20} />}
                  title="No recent activity"
                  description="Analyze your resume or generate a roadmap to start building your Orbit history."
                  className="min-h-56"
                />
              ) : (
                <div className="divide-y divide-white/8">
                  {notifications.map((item) => (
                    <div key={item.id} className="group flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-indigo-400/12 bg-indigo-500/8 text-indigo-300">
                        <Bell size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-200">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{item.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">Quick actions</h2>
              <p className="mt-1 text-sm text-slate-500">Continue your highest-value workflows.</p>
            </div>

            <div className="mt-5 grid gap-2">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-transparent p-3 text-left transition hover:border-white/8 hover:bg-white/[0.035]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-slate-400 transition group-hover:border-indigo-400/15 group-hover:bg-indigo-500/10 group-hover:text-indigo-300">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-slate-200">{item.label}</span>
                      <span className="mt-0.5 block truncate text-xs text-slate-600">
                        {item.description}
                      </span>
                    </span>
                    <ChevronRight className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-400" size={16} />
                  </button>
                );
              })}
            </div>
          </Card>
        </section>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-2 border-b border-white/8 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold tracking-tight text-white">Career snapshot</h2>
            <p className="text-sm text-slate-500">The profile context powering your recommendations.</p>
          </div>

          <div className="grid divide-y divide-white/8 md:grid-cols-3 md:divide-x md:divide-y-0">
            <SnapshotItem icon={GraduationCap} label="Branch" value={branch} />
            <SnapshotItem icon={Sparkles} label="Skills" value={skills} />
            <SnapshotItem icon={Target} label="Next milestone" value="Improve resume + roadmap" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function SnapshotItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 gap-3 px-5 py-5 sm:px-6">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.045] text-slate-400">
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-600">{label}</p>
        <p className="mt-1.5 break-words text-sm font-medium leading-6 text-slate-300">{value}</p>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard" className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[90rem] space-y-6 lg:space-y-8">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-3">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-11 w-72 max-w-[75vw]" />
            <Skeleton className="h-5 w-[30rem] max-w-[80vw]" />
          </div>
          <Skeleton className="hidden h-10 w-48 sm:block" />
        </div>

        <Card className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-5">
              <Skeleton className="h-8 w-36 rounded-full" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-20 w-full max-w-2xl" />
              <Skeleton className="h-12 w-72" />
            </div>
            <Skeleton className="h-60 rounded-[1.75rem]" />
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-60 rounded-[var(--radius-card)]" />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Skeleton className="h-80 rounded-[var(--radius-card)]" />
          <Skeleton className="h-80 rounded-[var(--radius-card)]" />
        </div>
      </div>
      <span className="sr-only">Loading your career dashboard.</span>
    </div>
  );
}
