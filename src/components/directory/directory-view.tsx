"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Sparkles, UserPlus, X } from "lucide-react";
import { semanticSearch } from "@/lib/ai/matching";
import { APP_ROUTES } from "@/lib/constants/app";
import type { AlumniProfile } from "@/types/profile";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";

interface DirectoryViewProps {
  profiles: AlumniProfile[];
  currentUserId: string;
}

export function DirectoryView({ profiles, currentUserId }: DirectoryViewProps) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("");
  const [selected, setSelected] = useState<AlumniProfile | null>(null);

  const industries = [...new Set(profiles.map((a) => a.industry).filter(Boolean))];

  const filtered = useMemo(() => {
    let results = query ? semanticSearch(query, profiles) : profiles;
    if (industry) results = results.filter((a) => a.industry === industry);
    if (role) results = results.filter((a) => a.role === role);
    return results;
  }, [profiles, query, industry, role]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Alumni Directory</h1>
        <p className="mt-1 text-text-secondary">
          Discover verified alumni with AI-powered semantic search
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by skills, role, company..."
            className="pl-10"
          />
          {query && (
            <Badge variant="ai" className="absolute right-3 top-1/2 -translate-y-1/2 gap-1">
              <Sparkles className="h-3 w-3" /> AI
            </Badge>
          )}
        </div>
        <Select value={industry} onChange={(e) => setIndustry(e.target.value)} className="sm:w-40">
          <option value="">All industries</option>
          {industries.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </Select>
        <Select value={role} onChange={(e) => setRole(e.target.value)} className="sm:w-36">
          <option value="">All roles</option>
          <option value="alumni">Alumni</option>
          <option value="student">Students</option>
        </Select>
      </div>

      {profiles.length === 0 ? (
        <EmptyState
          icon={UserPlus}
          title="Be the first profile in your network"
          description="Your directory is connected to Firestore and ready for real members. Invite alumni to create the first trusted constellation."
          action={<Link href={APP_ROUTES.referrals}><Button>Invite alumni</Button></Link>}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No alumni found"
          description="Try adjusting your search or filters."
          action={<Button variant="secondary" onClick={() => { setQuery(""); setIndustry(""); setRole(""); }}>Clear filters</Button>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((alumni) => (
            <button
              key={alumni.uid}
              type="button"
              onClick={() => setSelected(alumni)}
              className="rounded-xl border border-border bg-surface p-5 text-left transition-all hover:border-accent/40 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <UserAvatar name={alumni.displayName} photoURL={alumni.photoURL} size="lg" showOnline isOnline={alumni.isOnline} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-text-primary">{alumni.displayName}</p>
                  <p className="mt-0.5 text-sm text-text-secondary line-clamp-2">{alumni.headline}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {alumni.skills.slice(0, 3).map((s) => (
                  <Badge key={s} variant="default">{s}</Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-text-tertiary">
                <span>{alumni.location}</span>
                <span className="text-accent">{alumni.uid === currentUserId ? "Your profile" : `${alumni.mutualConnections ?? 0} mutual`}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md overflow-y-auto border-l border-border bg-surface shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-surface/95 p-4 backdrop-blur">
              <h2 className="font-semibold text-text-primary">Profile Preview</h2>
              <button type="button" onClick={() => setSelected(null)} className="rounded-lg p-1 hover:bg-surface-elevated">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <UserAvatar name={selected.displayName} photoURL={selected.photoURL} size="xl" showOnline isOnline={selected.isOnline} />
                <div>
                  <p className="text-xl font-semibold text-text-primary">{selected.displayName}</p>
                  <p className="text-sm text-text-secondary">{selected.headline}</p>
                  <Badge variant={selected.verificationStatus === "verified" ? "success" : "default"} className="mt-2">
                    {selected.verificationStatus === "verified" ? "Verified" : "Verification pending"}
                  </Badge>
                </div>
              </div>
              {selected.aiSummary && (
                <div className="rounded-xl border border-ai/20 bg-ai-subtle/20 p-4">
                  <p className="mb-1 text-xs font-medium text-ai">AI Summary</p>
                  <p className="text-sm text-text-secondary">{selected.aiSummary}</p>
                </div>
              )}
              <div>
                <p className="mb-2 text-sm font-medium text-text-primary">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.skills.map((s) => (
                    <Badge key={s} variant="accent">{s}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={APP_ROUTES.profile(selected.uid)} className="flex-1">
                  <Button className="w-full">View full profile</Button>
                </Link>
                {selected.uid !== currentUserId && <Link href={APP_ROUTES.network}>
                  <Button variant="secondary">Connect</Button>
                </Link>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
