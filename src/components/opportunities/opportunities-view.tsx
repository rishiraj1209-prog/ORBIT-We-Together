"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import type { Opportunity } from "@/types/opportunity";

export function OpportunitiesView() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/opportunities")
      .then((r) => r.json())
      .then((d) => setOpportunities(d.opportunities ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? opportunities : opportunities.filter((o) => o.type === filter);

  const typeLabels: Record<string, string> = {
    job: "Jobs",
    referral: "Referrals",
    internship: "Internships",
    collaboration: "Collaboration",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Opportunities</h1>
        <p className="mt-1 text-text-secondary">Jobs, referrals, internships, and collaborations</p>
      </div>

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
            <EmptyState icon={Briefcase} title="No opportunities" description="Check back later for new postings." />
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
