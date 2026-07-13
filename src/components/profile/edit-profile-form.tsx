"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { APP_ROUTES } from "@/lib/constants/app";
import type { AuthUser } from "@/types/auth";

interface EditProfileFormProps {
  user: AuthUser;
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    displayName: user.displayName ?? "",
    headline: user.headline ?? "",
    bio: "",
    location: "",
    industry: user.industry ?? "Technology",
    skills: (user.skills ?? []).join(", "),
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      router.push(APP_ROUTES.profile(user.uid));
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Edit Profile</h1>
        <p className="mt-1 text-text-secondary">Update your public profile information</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" value={form.displayName} onChange={(e) => setForm((p) => ({ ...p, displayName: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" value={form.headline} onChange={(e) => setForm((p) => ({ ...p, headline: e.target.value }))} placeholder="Role · Company" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} rows={4} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" value={form.industry} onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input id="skills" value={form.skills} onChange={(e) => setForm((p) => ({ ...p, skills: e.target.value }))} />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? <AuthSpinner className="text-white" /> : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
