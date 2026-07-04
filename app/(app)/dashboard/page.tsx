"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  BrainCircuit,
  Briefcase,
  FileText,
  Gift,
  LogOut,
  Network,
  Route,
  Sparkles,
  Target,
  Users,
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
      <div className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-10 w-44 animate-pulse rounded-xl bg-white/10" />

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="h-6 w-52 animate-pulse rounded-full bg-white/10" />
            <div className="mt-6 h-16 max-w-3xl animate-pulse rounded-2xl bg-white/10" />
            <div className="mt-5 h-6 max-w-xl animate-pulse rounded-xl bg-white/10" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="h-14 w-14 animate-pulse rounded-2xl bg-white/10" />
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
    <div className="px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-400">Career Mission Control</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/notifications")}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10"
            >
              <Bell size={18} />
              Alerts
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-200 hover:bg-red-500/20"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
                <Sparkles size={16} />
                Orbit AI Insight
              </p>

              <h2 className="text-3xl font-black leading-tight md:text-5xl">
                You are {stats.aiReadiness}% career-ready.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Orbit is building your personalized career graph using your
                profile, skills, resume, roadmap, alumni network and referral
                opportunities.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/profile")}
                  className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:scale-105"
                >
                  Complete Profile
                </button>

                <button
                  onClick={() => router.push("/roadmap")}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Generate Roadmap
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-7 text-center">
              <BrainCircuit className="mx-auto mb-4 text-cyan-300" size={42} />
              <p className="text-sm text-slate-300">AI Readiness Score</p>
              <p className="mt-2 text-6xl font-black">{stats.aiReadiness}%</p>
              <Progress value={stats.aiReadiness} />
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.12)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-400/20" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 shadow-lg shadow-cyan-500/20">
                    <Icon />
                  </div>

                  <p className="text-slate-400">{card.title}</p>

                  <h3 className="mt-3 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-4xl font-black text-transparent">
                    {card.value}
                  </h3>

                  {card.progress !== null && <Progress value={card.progress} />}

                  <p className="mt-4 leading-7 text-slate-400">{card.text}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl">
            <h3 className="mb-6 text-2xl font-bold">Recent Activity</h3>

            {notifications.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-black/20 p-8 text-slate-400">
                No recent activity yet. Analyze your resume or generate a
                roadmap to start building your Orbit history.
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl">
            <h3 className="mb-6 text-2xl font-bold">Quick Actions</h3>

            <div className="grid gap-3">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/10"
                  >
                    <div className="rounded-xl bg-indigo-500/20 p-3">
                      <Icon className="text-indigo-300" size={20} />
                    </div>

                    <span className="font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl">
          <h3 className="mb-5 text-2xl font-bold">Career Snapshot</h3>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-black/20 p-5">
              <p className="text-sm text-slate-400">Branch</p>
              <p className="mt-2 font-semibold">{branch}</p>
            </div>

            <div className="rounded-2xl bg-black/20 p-5">
              <p className="text-sm text-slate-400">Skills</p>
              <p className="mt-2 font-semibold">{skills}</p>
            </div>

            <div className="rounded-2xl bg-black/20 p-5">
              <p className="text-sm text-slate-400">Next Milestone</p>
              <p className="mt-2 font-semibold">Improve resume + roadmap</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
