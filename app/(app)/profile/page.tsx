"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Save,
  Sparkles,
  User,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Select,
  Textarea,
} from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import Progress from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfile, saveUserProfile } from "@/lib/profile";

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
  const { user, loading: authLoading } = useAuth();
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
    if (!user) return;

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

  if (authLoading || (user && loading)) {
    return <ProfileSkeleton />;
  }

  const initials = (profile.name || "O")
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
              <Sparkles size={14} />
              Orbit Identity
            </span>
          }
          title="Build your career profile."
          description="Orbit uses this context to personalize AI guidance, alumni matching, career roadmaps, and referral suggestions."
        />

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] xl:gap-8">
          <aside className="space-y-5 lg:sticky lg:top-6">
            <Card className="relative overflow-hidden border-indigo-400/15 bg-gradient-to-br from-indigo-500/13 via-violet-500/[0.05] to-cyan-500/[0.02] p-5 shadow-[var(--shadow-md)] sm:p-6">
              <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-indigo-500/18 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-20 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-2xl font-bold text-white shadow-xl shadow-indigo-950/40">
                    {initials}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/15 bg-cyan-500/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-200">
                    <BadgeCheck size={13} />
                    Verified
                  </span>
                </div>

                <h2 className="mt-5 break-words text-2xl font-bold tracking-tight text-white">
                  {profile.name || "Orbit User"}
                </h2>
                <p className="mt-1.5 break-all text-sm text-slate-500">
                  {profile.email || "Email not available"}
                </p>

                <div className="mt-6 rounded-2xl border border-white/8 bg-slate-950/30 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-300">Profile completion</span>
                    <span className="font-semibold text-indigo-200">{completion}%</span>
                  </div>
                  <Progress value={completion} />
                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    Complete profiles receive stronger AI and alumni recommendations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-white">Skills</h2>
                  <p className="mt-1 text-xs text-slate-600">{skills.length} detected</p>
                </div>
                <span className="flex size-9 items-center justify-center rounded-xl border border-violet-400/12 bg-violet-500/8 text-violet-300">
                  <Sparkles size={16} />
                </span>
              </div>

              {skills.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm leading-6 text-slate-500">
                  Add comma-separated skills such as React, Firebase, DSA, or Python.
                </div>
              ) : (
                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-indigo-400/12 bg-indigo-500/8 px-3 py-1.5 text-xs font-medium text-indigo-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </Card>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <ProfileSummary
                icon={GraduationCap}
                label="Education"
                value={
                  (profile.branch || "Branch not added") +
                  " · " +
                  (profile.graduationYear || "Year not added")
                }
              />
              <ProfileSummary
                icon={Briefcase}
                label="Dream company"
                value={profile.dreamCompany || "Not added"}
              />
            </div>
          </aside>

          <Card className="overflow-hidden">
            <div className="flex items-start gap-4 border-b border-white/8 px-5 py-5 sm:px-7 sm:py-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/12 bg-indigo-500/10 text-indigo-300">
                <User size={20} />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  Profile details
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Keep this information current for more relevant recommendations.
                </p>
              </div>
            </div>

            <div className="space-y-8 px-5 py-6 sm:px-7 sm:py-7">
              <fieldset>
                <legend className="text-sm font-semibold text-slate-200">Identity</legend>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  The basic information shown across your Orbit profile.
                </p>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <ProfileInput
                    id="profile-name"
                    label="Full name"
                    value={profile.name}
                    onChange={(value) => update("name", value)}
                    autoComplete="name"
                  />
                  <ProfileInput
                    id="profile-email"
                    label="Email"
                    value={profile.email}
                    onChange={() => {}}
                    disabled
                    type="email"
                    autoComplete="email"
                    description="Managed by your authenticated account."
                  />

                  <Field className="md:col-span-2">
                    <FieldLabel htmlFor="profile-role">Role</FieldLabel>
                    <Select
                      id="profile-role"
                      value={profile.role}
                      onChange={(event) =>
                        update("role", event.target.value as "student" | "alumni")
                      }
                    >
                      <option className="bg-slate-900" value="student">
                        Student
                      </option>
                      <option className="bg-slate-900" value="alumni">
                        Alumni
                      </option>
                    </Select>
                  </Field>
                </div>
              </fieldset>

              <div className="h-px bg-white/8" />

              <fieldset>
                <legend className="text-sm font-semibold text-slate-200">Education and goals</legend>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Used to tailor roadmaps, opportunities, and alumni matches.
                </p>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <ProfileInput
                    id="profile-college"
                    label="College"
                    value={profile.college}
                    onChange={(value) => update("college", value)}
                    autoComplete="organization"
                  />
                  <ProfileInput
                    id="profile-branch"
                    label="Branch"
                    value={profile.branch}
                    onChange={(value) => update("branch", value)}
                  />
                  <ProfileInput
                    id="profile-graduation-year"
                    label="Graduation year"
                    value={profile.graduationYear}
                    onChange={(value) => update("graduationYear", value)}
                    inputMode="numeric"
                  />
                  <ProfileInput
                    id="profile-dream-company"
                    label="Dream company"
                    value={profile.dreamCompany}
                    onChange={(value) => update("dreamCompany", value)}
                  />
                </div>
              </fieldset>

              <div className="h-px bg-white/8" />

              <fieldset>
                <legend className="text-sm font-semibold text-slate-200">Career context</legend>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Give Orbit AI more context about your strengths and ambitions.
                </p>

                <div className="mt-5 grid gap-5">
                  <Field>
                    <FieldLabel htmlFor="profile-skills">Skills</FieldLabel>
                    <Textarea
                      id="profile-skills"
                      rows={4}
                      value={profile.skills}
                      onChange={(event) => update("skills", event.target.value)}
                      placeholder="React, Firebase, DSA, AI, Python"
                    />
                    <FieldDescription>Separate each skill with a comma.</FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="profile-bio">Bio</FieldLabel>
                    <Textarea
                      id="profile-bio"
                      rows={5}
                      value={profile.bio}
                      onChange={(event) => update("bio", event.target.value)}
                      placeholder="Tell Orbit AI about your career goals, interests, and strengths."
                    />
                  </Field>
                </div>
              </fieldset>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/8 bg-white/[0.015] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <p className="text-xs leading-5 text-slate-600">
                Changes improve recommendations across your workspace.
              </p>
              <Button variant="gradient" size="lg" onClick={save}>
                <Save />
                Save profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProfileInput({
  id,
  label,
  value,
  onChange,
  description,
  ...props
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
} & Omit<React.ComponentProps<"input">, "id" | "value" | "onChange">) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}

function ProfileSummary({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
}) {
  return (
    <Card className="flex gap-3 p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-500/[0.07] text-cyan-300">
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-600">{label}</p>
        <p className="mt-1.5 break-words text-sm font-medium leading-6 text-slate-300">{value}</p>
      </div>
    </Card>
  );
}

function ProfileSkeleton() {
  return (
    <div role="status" aria-label="Loading profile" className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-[82rem] space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-11 w-80 max-w-[80vw]" />
          <Skeleton className="h-5 w-[34rem] max-w-[85vw]" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-5">
            <Skeleton className="h-80 rounded-[var(--radius-card)]" />
            <Skeleton className="h-44 rounded-[var(--radius-card)]" />
          </div>
          <Skeleton className="h-[48rem] rounded-[var(--radius-card)]" />
        </div>
      </div>
      <span className="sr-only">Loading your career profile.</span>
    </div>
  );
}
