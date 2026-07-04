"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BrainCircuit,
  Briefcase,
  LogOut,
  Sparkles,
  Target,
  Users,
  FileText,
  Route,
  Network,
  Gift,
} from "lucide-react";
import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/providers/auth-provider";
import { getUserProfile, UserProfile } from "@/lib/profile";

type DashboardProfile = {
  name: string;
  branch: string;
  dreamCompany: string;
  skills: string;
};

const fallbackProfile: DashboardProfile = {
  name: "Student",
  branch: "Not added",
  dreamCompany: "Not added",
  skills: "Not added",
};

const navItems = [
  { label: "Profile", path: "/profile", icon: Users },
  { label: "AI", path: "/ai", icon: BrainCircuit },
  { label: "Resume", path: "/resume", icon: FileText },
  { label: "Roadmap", path: "/roadmap", icon: Route },
  { label: "Alumni", path: "/alumni", icon: Network },
  { label: "Jobs", path: "/opportunities", icon: Briefcase },
  { label: "Referrals", path: "/referrals", icon: Gift },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) {
      setProfileLoading(false);
      return;
    }

    async function loadProfile() {
      if (!user) return;
      const data = await getUserProfile(user.uid);
      setProfile(data);
      setProfileLoading(false);
    }

    loadProfile();
  }, [user]);

  async function logout() {
    await signOut(auth);
    router.push("/");
  }

  if (loading || profileLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-400">Loading Orbit...</p>
      </main>
    );
  }

  const current: DashboardProfile = profile
    ? {
        name: profile.name || fallbackProfile.name,
        branch: profile.branch || fallbackProfile.branch,
        dreamCompany: profile.dreamCompany || fallbackProfile.dreamCompany,
        skills: profile.skills || fallbackProfile.skills,
      }
    : fallbackProfile;

  const cards = [
    {
      title: "Career Readiness",
      value: profile ? "82%" : "42%",
      icon: Target,
      text: `Target: ${current.dreamCompany}.`,
    },
    {
      title: "Best Alumni Matches",
      value: "24",
      icon: Users,
      text: `Matching alumni using ${current.branch} and skills.`,
    },
    {
      title: "Referral Opportunities",
      value: "12",
      icon: Briefcase,
      text: "Referral-backed openings found.",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-3xl font-black text-transparent">
            Orbit
          </h1>

          <button
            onClick={logout}
            className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </nav>

        <section className="mb-8 grid gap-3 md:grid-cols-4 lg:grid-cols-7">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:-translate-y-1 hover:bg-white/10"
              >
                <Icon className="mb-3 text-indigo-300" size={20} />
                <p className="text-sm font-semibold">{item.label}</p>
              </button>
            );
          })}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                <Sparkles size={16} className="mr-2" />
                AI Career Mission Control
              </p>

              <h2 className="text-4xl font-black tracking-tight md:text-6xl">
                Welcome, {current.name}.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                Your personalized career graph combines profile, resume,
                roadmap, alumni, referrals and AI guidance.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6 text-center">
              <BrainCircuit className="mx-auto mb-3 text-cyan-300" size={38} />
              <p className="text-sm text-slate-400">AI Match Score</p>
              <p className="text-5xl font-black">{profile ? "94%" : "48%"}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20">
                  <Icon />
                </div>

                <p className="text-slate-400">{card.title}</p>
                <h3 className="mt-2 text-4xl font-black">{card.value}</h3>
                <p className="mt-4 leading-7 text-slate-400">{card.text}</p>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}