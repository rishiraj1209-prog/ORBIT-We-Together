"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, Plus, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import type { Opportunity } from "@/types/opportunity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function OpportunitiesView() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ type: "job", title: "", company: "", location: "", description: "", tags: "", salary: "", remote: false });

  async function loadOpportunities() {
    const response = await fetch("/api/opportunities");
    const data = await response.json();
    setOpportunities(data.opportunities ?? []);
  }

  useEffect(() => {
    fetch("/api/opportunities")
      .then((response) => response.json())
      .then((data) => setOpportunities(data.opportunities ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to publish opportunity.");
      await loadOpportunities();
      setForm({ type: "job", title: "", company: "", location: "", description: "", tags: "", salary: "", remote: false });
      setShowForm(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to publish opportunity.");
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = filter === "all" ? opportunities : opportunities.filter((o) => o.type === filter);

  const typeLabels: Record<string, string> = {
    job: "Jobs",
    referral: "Referrals",
    internship: "Internships",
    collaboration: "Collaboration",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h1 className="text-3xl font-semibold text-text-primary">Opportunities</h1><p className="mt-1 text-text-secondary">Trusted openings posted by real Orbit members</p></div>
        <Button onClick={() => setShowForm((value) => !value)} className="gap-2">{showForm ? <X /> : <Plus />}{showForm ? "Close" : "Post opportunity"}</Button>
      </div>

      {showForm && <form onSubmit={handleCreate} className="rounded-[26px] border border-gold/25 bg-surface p-6 shadow-sm">
        <div className="mb-5"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-gold">Trusted opportunity desk</p><h2 className="mt-2 text-xl font-medium">Share an opportunity</h2></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>Type</Label><Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="job">Job</option><option value="referral">Referral</option><option value="internship">Internship</option><option value="collaboration">Collaboration</option></Select></div>
          <div className="space-y-2"><Label htmlFor="opp-title">Title</Label><Input id="opp-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Product designer" /></div>
          <div className="space-y-2"><Label htmlFor="opp-company">Company or team</Label><Input id="opp-company" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="opp-location">Location</Label><Input id="opp-location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="opp-tags">Skills and tags</Label><Input id="opp-tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, Design systems" /></div>
          <div className="space-y-2"><Label htmlFor="opp-salary">Compensation (optional)</Label><Input id="opp-salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div>
        </div>
        <div className="mt-4 space-y-2"><Label htmlFor="opp-description">Details</Label><Textarea id="opp-description" required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the role, expectations, and how members should express interest." /></div>
        <label className="mt-4 flex items-center gap-2 text-sm text-text-secondary"><input type="checkbox" checked={form.remote} onChange={(e) => setForm({ ...form, remote: e.target.checked })} /> Remote-friendly</label>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={submitting} className="mt-5">{submitting ? "Publishing…" : "Publish opportunity"}</Button>
      </form>}

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
          <TabsTrigger value="referral">Referrals</TabsTrigger>
          <TabsTrigger value="internship">Internships</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value={filter}>
          {loading ? (
            <div className="flex justify-center py-12"><AuthSpinner /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={Briefcase} title={opportunities.length === 0 ? "No real opportunities yet" : "No matches in this category"} description={opportunities.length === 0 ? "Share the first trusted opening with your alumni network." : "Try another opportunity category."} action={opportunities.length === 0 ? <Button onClick={() => setShowForm(true)}>Post the first opportunity</Button> : undefined} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((opp) => (
                <Card key={opp.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <Badge variant={opp.type === "referral" ? "accent" : "default"}>{typeLabels[opp.type]}</Badge>
                      {opp.remote && <Badge variant="success">Remote</Badge>}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-text-primary">{opp.title}</h3>
                    <p className="text-sm font-medium text-text-secondary">{opp.company}</p>
                    <p className="mt-3 text-sm text-text-secondary line-clamp-3">{opp.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-text-tertiary">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{opp.location}</span>
                      {opp.applicants && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{opp.applicants} interested</span>}
                      {opp.salary && <span className="text-accent">{opp.salary}</span>}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {opp.tags.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
                    </div>
                    <p className="mt-4 text-xs text-text-tertiary">Posted by {opp.postedByName}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
