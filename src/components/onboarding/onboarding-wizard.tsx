"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { ONBOARDING_STEPS, type OnboardingStepId } from "@/lib/constants/app";
import { cn } from "@/lib/utils/cn";
import type { AuthUser } from "@/types/auth";
import type { Experience, Education } from "@/types/profile";

interface OnboardingWizardProps {
  user: AuthUser;
}

interface OnboardingData {
  role: "alumni" | "student";
  displayName: string;
  headline: string;
  bio: string;
  aiSummary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  location: string;
  industry: string;
  graduationYear: number;
  department: string;
  photoURL: string;
  resumeUrl: string;
}

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export function OnboardingWizard({ user }: OnboardingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStepId>("welcome");
  const [loading, setLoading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [data, setData] = useState<OnboardingData>({
    role: "alumni",
    displayName: user.displayName ?? "",
    headline: "",
    bio: "",
    aiSummary: "",
    skills: [],
    experience: [],
    education: [],
    location: "",
    industry: "Technology",
    graduationYear: new Date().getFullYear(),
    department: "",
    photoURL: user.photoURL ?? "",
    resumeUrl: "",
  });

  const stepIndex = ONBOARDING_STEPS.findIndex((s) => s.id === step);
  const isLast = step === "complete";

  function next() {
    const nextStep = ONBOARDING_STEPS[stepIndex + 1];
    if (nextStep) setStep(nextStep.id);
  }

  function back() {
    const prevStep = ONBOARDING_STEPS[stepIndex - 1];
    if (prevStep) setStep(prevStep.id);
  }

  async function handleResumeUpload(file: File) {
    setParsing(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/ai/parse-resume", { method: "POST", body: formData });
      const parsed = await res.json();
      setData((prev) => ({
        ...prev,
        headline: parsed.headline ?? prev.headline,
        aiSummary: parsed.summary ?? prev.aiSummary,
        skills: parsed.skills ?? prev.skills,
        experience: (parsed.experience ?? []).map((e: Experience, i: number) => ({
          ...e,
          id: `exp-${i}`,
        })),
        education: (parsed.education ?? []).map((e: Education, i: number) => ({
          ...e,
          id: `edu-${i}`,
        })),
        resumeUrl: file.name,
      }));
    } finally {
      setParsing(false);
    }
  }

  async function handleAvatarUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/onboarding/avatar", { method: "POST", body: formData });
    const { photoURL } = await res.json();
    setData((prev) => ({ ...prev, photoURL }));
  }

  async function handleComplete() {
    setLoading(true);
    try {
      await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: data.role }),
      });
      router.push("/app");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  function addSkill() {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      setData((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput("");
    }
  }

  const completeness = Math.min(
    100,
    (data.displayName ? 15 : 0) +
      (data.photoURL ? 15 : 0) +
      (data.headline ? 15 : 0) +
      (data.skills.length >= 3 ? 20 : data.skills.length * 5) +
      (data.experience.length > 0 ? 20 : 0) +
      (data.education.length > 0 ? 15 : 0)
  );

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-ai/10 blur-3xl" />
      </div>

      <header className="relative flex items-center justify-between px-6 py-5 sm:px-8">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="relative mx-auto max-w-2xl px-6 py-8 sm:px-8">
        <OnboardingProgress currentStep={step} />

        <div className="rounded-2xl border border-border/60 bg-surface/70 p-8 shadow-2xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === "welcome" && (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent-subtle">
                    <Sparkles className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
                      Welcome to Orbit
                    </h1>
                    <p className="mt-3 text-text-secondary">
                      Let&apos;s build your profile in under 3 minutes. Our AI will help extract
                      your skills and craft the perfect summary.
                    </p>
                  </div>
                  <Button size="lg" className="w-full" onClick={next}>
                    Get started
                  </Button>
                </div>
              )}

              {step === "role" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary">Who are you?</h2>
                    <p className="mt-1 text-sm text-text-secondary">
                      This helps us personalize your experience.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(["alumni", "student"] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setData((p) => ({ ...p, role }))}
                        className={cn(
                          "rounded-xl border p-5 text-left transition-all",
                          data.role === role
                            ? "border-accent bg-accent-subtle shadow-sm"
                            : "border-border hover:border-text-tertiary"
                        )}
                      >
                        <p className="font-semibold capitalize text-text-primary">{role}</p>
                        <p className="mt-1 text-xs text-text-secondary">
                          {role === "alumni"
                            ? "Graduated and ready to mentor"
                            : "Currently enrolled, seeking guidance"}
                        </p>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      value={data.displayName}
                      onChange={(e) => setData((p) => ({ ...p, displayName: e.target.value }))}
                      placeholder="Your name"
                    />
                  </div>
                </div>
              )}

              {step === "resume" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary">Upload your resume</h2>
                    <p className="mt-1 text-sm text-text-secondary">
                      AI will extract skills, experience, and education. Or skip to fill manually.
                    </p>
                  </div>
                  <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-border bg-surface-elevated/30 px-6 py-12 transition-colors hover:border-accent hover:bg-accent-subtle/20">
                    <input
                      type="file"
                      accept=".pdf,.txt,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleResumeUpload(file);
                      }}
                    />
                    {parsing ? (
                      <AuthSpinner className="h-8 w-8 text-accent" />
                    ) : (
                      <>
                        <p className="font-medium text-text-primary">Drop your resume here</p>
                        <p className="mt-1 text-xs text-text-tertiary">PDF, DOC, or TXT</p>
                      </>
                    )}
                  </label>
                  {data.skills.length > 0 && (
                    <div className="rounded-lg border border-success/30 bg-success-subtle/30 p-4">
                      <p className="text-sm font-medium text-success">
                        AI extracted {data.skills.length} skills
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === "profile" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary">Review your profile</h2>
                    <p className="mt-1 text-sm text-text-secondary">Edit anything the AI got wrong.</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Headline</Label>
                    <Input
                      value={data.headline}
                      onChange={(e) => setData((p) => ({ ...p, headline: e.target.value }))}
                      placeholder="Senior Engineer · Company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>AI Summary</Label>
                    <Textarea
                      value={data.aiSummary}
                      onChange={(e) => setData((p) => ({ ...p, aiSummary: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((s) => (
                        <Badge key={s} variant="accent">{s}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Add skill"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" variant="secondary" onClick={addSkill}>Add</Button>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select
                        value={data.industry}
                        onChange={(e) => setData((p) => ({ ...p, industry: e.target.value }))}
                      >
                        <option value="Technology">Technology</option>
                        <option value="Design">Design</option>
                        <option value="Finance">Finance</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Marketing">Marketing</option>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={data.location}
                        onChange={(e) => setData((p) => ({ ...p, location: e.target.value }))}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === "avatar" && (
                <div className="space-y-6 text-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary">Add a photo</h2>
                    <p className="mt-1 text-sm text-text-secondary">
                      Profiles with photos get 5× more connection requests.
                    </p>
                  </div>
                  <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-accent/30 bg-accent-subtle">
                    {data.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={data.photoURL} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-accent">
                        {data.displayName.charAt(0) || "?"}
                      </span>
                    )}
                  </div>
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleAvatarUpload(file);
                      }}
                    />
                    <Button variant="secondary" asChild>
                      <span>Upload photo</span>
                    </Button>
                  </label>
                </div>
              )}

              {step === "complete" && (
                <div className="space-y-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-accent bg-accent-subtle"
                  >
                    <span className="text-2xl font-bold text-accent">{completeness}%</span>
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-semibold text-text-primary">You&apos;re all set!</h2>
                    <p className="mt-2 text-text-secondary">
                      Your profile is {completeness}% complete. Start connecting with alumni now.
                    </p>
                  </div>
                  <Progress value={completeness} className="h-2" />
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Profile live", "AI matching active", "Network unlocked"].map((t) => (
                      <Badge key={t} className="bg-accent-subtle text-accent">{t}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {!isLast && step !== "welcome" && (
            <div className="mt-8 flex gap-3">
              <Button variant="secondary" onClick={back} disabled={stepIndex === 0}>
                Back
              </Button>
              <Button className="flex-1" onClick={next}>
                Continue
              </Button>
            </div>
          )}

          {step === "welcome" && null}

          {isLast && (
            <Button
              size="lg"
              className="mt-8 w-full"
              onClick={handleComplete}
              disabled={loading}
            >
              {loading ? <AuthSpinner className="text-white" /> : "Enter Orbit"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
