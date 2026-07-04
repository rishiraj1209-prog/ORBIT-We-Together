"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Save,
  Sparkles,
  Target,
  User,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { getUserProfile, saveUserProfile } from "@/lib/profile";
import Progress from "@/components/ui/progress";

type ProfileForm = {
  name: string;
  email: string;
  college: string;
  branch: string;
  graduationYear: string;
  dreamCompany: string;
  bio: string;
  skills: string;
  role: "student" | "alumni";
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileForm>({
    name: "",
    email: "",
    college: "",
    branch: "",
    graduationYear: "",
    dreamCompany: "",
    bio: "",
    skills: "",
    role: "student",
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadProfile() {
      if (!user) return;

      const data = await getUserProfile(user.uid);

      if (data) {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          college: data.college || "",
          branch: data.branch || "",
          graduationYear: data.graduationYear || "",
          dreamCompany: data.dreamCompany || "",
          bio: data.bio || "",
          skills: data.skills || "",
          role: data.role || "student",
        });
      } else {
        setProfile((prev) => ({
          ...prev,
          name: user.displayName || "",
          email: user.email || "",
        }));
      }

      setLoading(false);
    }

    loadProfile();
  }, [user]);

  const skills = useMemo(
    () =>
      profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    [profile.skills]
  );

  const completion = useMemo(() => {
    const fields = [
      profile.name,
      profile.email,
      profile.college,
      profile.branch,
      profile.graduationYear,
      profile.dreamCompany,
      profile.bio,
      profile.skills,
    ];

    return Math.round(
      (fields.filter((item) => item.trim().length > 0).length / fields.length) *
        100
    );
  }, [profile]);

  function update(field: keyof ProfileForm, value: string) {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function save() {
    if (!user) return;

    await saveUserProfile({
      uid: user.uid,
      ...profile,
    });

    toast.success("Profile saved successfully!");
  }

  if (loading) {
    return (
      <div className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="h-10 w-56 animate-pulse rounded-xl bg-white/10" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="h-96 animate-pulse rounded-[2rem] bg-white/5" />
            <div className="h-96 animate-pulse rounded-[2rem] bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Sparkles size={16} />
            Orbit Identity
          </p>

          <h1 className="text-5xl font-black tracking-tight">
            Build your career profile.
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Orbit uses your profile to personalize AI guidance, alumni matching,
            career roadmaps and referral suggestions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-6">
            <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-7 backdrop-blur-2xl">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-lime-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-green-500 to-lime-400 text-4xl font-black shadow-2xl shadow-green-500/20">
                  {(profile.name || "O")
                    .split(" ")
                    .map((item) => item[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <h2 className="mt-6 text-3xl font-black">
                  {profile.name || "Orbit User"}
                </h2>

                <p className="mt-2 text-slate-400">{profile.email}</p>

                <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="text-green-300" />
                    <div>
                      <p className="font-semibold">Verified Career Profile</p>
                      <p className="text-sm text-slate-400">
                        Connected to Firebase and Orbit AI.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Profile Completion</span>
                    <span>{completion}%</span>
                  </div>
                  <Progress value={completion} />
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl">
              <h3 className="mb-5 text-xl font-bold">Skills</h3>

              {skills.length === 0 ? (
                <p className="text-slate-400">
                  Add comma-separated skills like React, Firebase, DSA.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-lime-500/20 bg-lime-500/10 px-3 py-1 text-sm text-lime-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>

            <section className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <GraduationCap className="mb-3 text-green-300" />
                <p className="text-sm text-slate-400">Education</p>
                <p className="mt-1 font-semibold">
                  {profile.branch || "Branch not added"} ·{" "}
                  {profile.graduationYear || "Year not added"}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <Briefcase className="mb-3 text-lime-300" />
                <p className="text-sm text-slate-400">Dream Company</p>
                <p className="mt-1 font-semibold">
                  {profile.dreamCompany || "Not added"}
                </p>
              </div>
            </section>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl">
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-2xl bg-green-500/20 p-3">
                <User className="text-green-300" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Profile Details</h2>
                <p className="text-sm text-slate-400">
                  Keep this updated for better AI recommendations.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Full Name" value={profile.name} onChange={(v) => update("name", v)} />
              <Input label="Email" value={profile.email} disabled onChange={() => {}} />
              <Input label="College" value={profile.college} onChange={(v) => update("college", v)} />
              <Input label="Branch" value={profile.branch} onChange={(v) => update("branch", v)} />
              <Input label="Graduation Year" value={profile.graduationYear} onChange={(v) => update("graduationYear", v)} />
              <Input label="Dream Company" value={profile.dreamCompany} onChange={(v) => update("dreamCompany", v)} />

              <div>
                <label className="text-sm text-slate-400">Role</label>
                <select
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
                  value={profile.role}
                  onChange={(e) =>
                    update("role", e.target.value as "student" | "alumni")
                  }
                >
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-slate-400">Skills</label>
                <textarea
                  rows={4}
                  value={profile.skills}
                  onChange={(e) => update("skills", e.target.value)}
                  placeholder="React, Firebase, DSA, AI, Python"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-slate-400">Bio</label>
                <textarea
                  rows={5}
                  value={profile.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="Tell Orbit AI about your career goals, interests and strengths."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
                />
              </div>
            </div>

            <button
              onClick={save}
              className="mt-7 flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-4 font-semibold transition hover:scale-105 hover:bg-green-500"
            >
              <Save size={18} />
              Save Profile
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-slate-400">{label}</label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-4 outline-none disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}