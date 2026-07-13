import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Briefcase,
  ExternalLink,
  GraduationCap,
  MapPin,
  Pencil,
  Sparkles,
} from "lucide-react";
import { getSeedAlumniById } from "@/lib/data/seed-alumni";
import { requireOnboardingComplete } from "@/lib/auth/guards";
import { APP_ROUTES } from "@/lib/constants/app";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const profile = getSeedAlumniById(id);
  return { title: profile?.displayName ?? "Profile" };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireOnboardingComplete();
  const { id } = await params;
  const profile = getSeedAlumniById(id);

  if (!profile && id !== user.uid) notFound();

  const isOwn = id === user.uid;
  const display = profile ?? {
    uid: user.uid,
    displayName: user.displayName ?? "You",
    photoURL: user.photoURL,
    headline: user.headline ?? "Orbit Member",
    bio: "",
    aiSummary: "Active member of the Orbit alumni network.",
    skills: user.skills ?? [],
    experience: [],
    education: [],
    socialLinks: {},
    location: "",
    industry: user.industry ?? "Technology",
    verificationStatus: "verified" as const,
    profileCompleteness: user.profileCompleteness ?? 80,
    email: user.email ?? "",
    role: user.role,
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-accent/20 via-ai/20 to-accent/10" />
        <CardContent className="relative px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <UserAvatar name={display.displayName} photoURL={display.photoURL} size="xl" className="ring-4 ring-surface" />
              <div className="pb-1">
                <h1 className="text-2xl font-semibold text-text-primary">{display.displayName}</h1>
                <p className="text-text-secondary">{display.headline}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="success">Verified</Badge>
                  {display.industry && <Badge variant="default">{display.industry}</Badge>}
                </div>
              </div>
            </div>
            {isOwn && (
              <Link href={APP_ROUTES.profileEdit}>
                <Button variant="secondary" className="gap-2">
                  <Pencil className="h-4 w-4" /> Edit profile
                </Button>
              </Link>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-text-secondary">
            {display.location && (
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{display.location}</span>
            )}
            {display.industry && (
              <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{display.industry}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {display.aiSummary && (
        <Card className="border-ai/20 bg-ai-subtle/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-ai" /> AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-text-secondary">{display.aiSummary}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {display.experience.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {display.experience.map((exp, i) => (
                  <div key={exp.id}>
                    {i > 0 && <Separator className="mb-6" />}
                    <p className="font-semibold text-text-primary">{exp.title}</p>
                    <p className="text-sm text-text-secondary">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                    <p className="mt-1 text-xs text-text-tertiary">
                      {exp.startDate}{exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate}` : ""}
                    </p>
                    {exp.description && <p className="mt-2 text-sm text-text-secondary">{exp.description}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {display.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {display.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-text-primary">{edu.school}</p>
                    <p className="text-sm text-text-secondary">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</p>
                    {edu.endYear && <p className="text-xs text-text-tertiary">{edu.endYear}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Skills</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {display.skills.map((s) => (
                  <Badge key={s} variant="accent">{s}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {Object.values(display.socialLinks).some(Boolean) && (
            <Card>
              <CardHeader><CardTitle className="text-base">Links</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {display.socialLinks.linkedin && (
                  <a href={display.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-accent hover:underline">
                    LinkedIn <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {display.socialLinks.github && (
                  <a href={display.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-accent hover:underline">
                    GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {display.socialLinks.website && (
                  <a href={display.socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-accent hover:underline">
                    Website <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          )}

          {!isOwn && (
            <div className="space-y-2">
              <Link href={APP_ROUTES.network}><Button className="w-full">Connect</Button></Link>
              <Link href={APP_ROUTES.introductions}><Button variant="secondary" className="w-full">Request intro</Button></Link>
              <Link href={APP_ROUTES.messages}><Button variant="secondary" className="w-full">Message</Button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
