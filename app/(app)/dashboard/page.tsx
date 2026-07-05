"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  BrainCircuit,
  Briefcase,
  FileText,
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
import Progress from "@/components/ui/progress";

const quickActions = [
  { label: "Analyze Resume", path: "/resume", icon: FileText },
  { label: "Ask AI", path: "/ai", icon: BrainCircuit },
  { label: "Generate Roadmap", path: "/roadmap", icon: Route },
  { label: "Find Alumni", path: "/alumni", icon: Network },
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
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-10 w-44 animate-pulse rounded-xl bg-white/10" />
          <div className="glass rounded-3xl p-8">
            <div className="h-6 w-52 animate-pulse rounded-full bg-white/10" />
            <div className="mt-6 h-16 max-w-3xl animate-pulse rounded-2xl bg-white/10" />
            <div className="mt-5 h-6 max-w-xl animate-pulse rounded-xl bg-white/10" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass rounded-2xl p-6">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-white/10" />
                <div className="mt-6 h-5 w-32 animate-pulse rounded-xl bg-white/10" />
                <div className="mt-4 h-10 w-24 animate-pulse rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = getDashboardStats(profile);

  const name = profile?.name || user?.displayName || "Student";
  const branch = profile?.branch || "Not added";
  const skills = profile?.skills || "Not added";

  const cards = [
    {
      title: "Profile Completion",
      value: `${stats.profileCompletion}%`,
      icon: Target,
      progress: stats.profileCompletion,
      text:
        stats.profileCompletion === 100
          ? "Your profile is complete and ready for stronger AI matching."
          : "Complete your profile to unlock stronger recommendations.",
    },
    {
      title: "AI Readiness",
      value: `${stats.aiReadiness}%`,
      icon: BrainCircuit,
      progress: stats.aiReadiness,
      text: `${stats.skillsCount} skills detected in your profile.`,
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
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Career Mission Control
            </p>
            <h1 className="mt-2 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome back,{" "}
              <span className="text-gradient">{name}</span>
            </h1>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={() => router.push("/notifications")}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-4 py-2.5 text-sm font-medium transition hover:border-primary/40 hover:bg-primary/10"
            >
              <Bell className="h-4 w-4" />
              Alerts
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive-foreground transition hover:bg-destructive/20"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Hero insight */}
        <section className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Orbit AI Insight
              </p>
              <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                You are {stats.aiReadiness}% career-ready.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                Orbit is building your personalized career graph using your
                profile, skills, resume, roadmap, alumni network and referral
                opportunities.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <button
                  onClick={() => router.push("/profile")}
                  className="btn-primary rounded-xl px-5 py-3 text-sm"
                >
                  Complete Profile
                </button>
                <button
                  onClick={() => router.push("/roadmap")}
                  className="rounded-xl border border-border bg-white/5 px-5 py-3 text-sm font-medium transition hover:border-primary/40 hover:bg-primary/10"
                >
                  Generate Roadmap
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 text-center">
              <BrainCircuit className="mx-auto mb-3 h-10 w-10 text-primary" />
              <p className="text-sm text-muted-foreground">AI Readiness Score</p>
              <p className="mt-1 font-display text-6xl font-bold">
                {stats.aiReadiness}%
              </p>
              <Progress value={stats.aiReadiness} />
            </div>
          </div>
        </section>

        {/* Stat cards */}
        <section className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <p className="mt-5 text-sm text-muted-foreground">
                    {card.title}
                  </p>
                  <h3 className="mt-1.5 font-display text-3xl font-bold tracking-tight">
                    {card.value}
                  </h3>
                  {card.progress !== null && <Progress value={card.progress} />}
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {card.text}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Activity + Quick actions */}
        <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="glass rounded-3xl p-6 sm:p-7">
            <h3 className="mb-5 font-display text-xl font-semibold">
              Recent Activity
            </h3>
            {notifications.length === 0 ? (
              <div className="rounded-2xl border border-border bg-black/20 p-8 text-sm leading-relaxed text-muted-foreground">
                No recent activity yet. Analyze your resume or generate a roadmap
                to start building your Orbit history.
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-border bg-black/20 p-5"
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass rounded-3xl p-6 sm:p-7">
            <h3 className="mb-5 font-display text-xl font-semibold">
              Quick Actions
            </h3>
            <div className="grid gap-2.5">
              {quickActions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className="flex items-center gap-3.5 rounded-2xl border border-border bg-black/20 p-4 text-left transition hover:border-primary/40 hover:bg-primary/10"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                      <Icon className="h-[18px] w-[18px] text-primary" />
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Career snapshot */}
        <section className="glass rounded-3xl p-6 sm:p-7">
          <h3 className="mb-5 font-display text-xl font-semibold">
            Career Snapshot
          </h3>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-black/20 p-5">
              <p className="text-sm text-muted-foreground">Branch</p>
              <p className="mt-2 font-semibold">{branch}</p>
            </div>
            <div className="rounded-2xl border border-border bg-black/20 p-5">
              <p className="text-sm text-muted-foreground">Skills</p>
              <p className="mt-2 font-semibold">{skills}</p>
            </div>
            <div className="rounded-2xl border border-border bg-black/20 p-5">
              <p className="text-sm text-muted-foreground">Next Milestone</p>
              <p className="mt-2 font-semibold">Improve resume + roadmap</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
