"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Shuffle, Sparkles, UserPlus, Users } from "lucide-react";
import { SEED_ALUMNI } from "@/lib/data/seed-alumni";
import { getSuggestedConnections } from "@/lib/ai/matching";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import type { AuthUser } from "@/types/auth";

interface NetworkViewProps {
  user: AuthUser;
}

export function NetworkView({ user }: NetworkViewProps) {
  const [connections, setConnections] = useState<Array<{
    id: string;
    status: string;
    profile: { displayName: string; photoURL: string | null; headline?: string } | null;
    fromUid: string;
    toUid: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [serendipityIndex, setSerendipityIndex] = useState(0);

  const suggestions = getSuggestedConnections(
    user.skills ?? ["Networking"],
    user.industry,
    SEED_ALUMNI,
    user.uid,
    6
  );

  useEffect(() => {
    fetch("/api/connections")
      .then((r) => r.json())
      .then((d) => setConnections(d.connections ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function handleConnect(toUid: string) {
    await fetch("/api/connections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toUid }),
    });
    const res = await fetch("/api/connections");
    const d = await res.json();
    setConnections(d.connections ?? []);
  }

  async function handleRespond(id: string, status: "accepted" | "declined") {
    await fetch(`/api/connections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const res = await fetch("/api/connections");
    const d = await res.json();
    setConnections(d.connections ?? []);
  }

  const pending = connections.filter((c) => c.status === "pending");
  const accepted = connections.filter((c) => c.status === "accepted");

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-7 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.22em] text-gold">Relationship graph</p><h1 className="font-display text-5xl text-text-primary">Your network</h1><p className="mt-2 text-sm text-text-secondary">Discover the trust paths and unexpected people around you.</p></div>
      </div>

      {suggestions.length > 0 && (() => {
        const person = suggestions[serendipityIndex % suggestions.length];
        return <section className="relative overflow-hidden rounded-[28px] border border-gold/25 bg-ink p-6 text-[#f3efe6] sm:p-8">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#c8a96c]/15"/><div className="absolute -right-5 -top-10 h-44 w-44 rounded-full border border-[#c8a96c]/20"/>
          <div className="relative grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><span className="inline-flex items-center gap-2 rounded-full border border-[#c8a96c]/25 px-3 py-1.5 text-[10px] uppercase tracking-[.18em] text-[#c8a96c]"><Sparkles className="h-3 w-3"/> Serendipity mode</span><h2 className="font-display mt-6 text-4xl leading-tight">One person you wouldn’t think to search for.</h2><p className="mt-4 text-sm leading-6 text-[#aaa99f]">Orbit deliberately steps outside your obvious filters to find an adjacent perspective with unusually high upside.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[.055] p-5 backdrop-blur-xl"><div className="flex items-start gap-4"><UserAvatar name={person.displayName} photoURL={person.photoURL} size="lg"/><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-medium">{person.displayName}</p><span className="rounded-full bg-[#c8a96c]/15 px-2 py-1 text-[10px] text-[#c8a96c]">{person.matchScore}% latent fit</span></div><p className="mt-1 text-xs text-[#aaa99f]">{person.headline}</p><p className="mt-4 text-xs leading-5 text-[#8d9087]">{person.matchReason}</p></div></div><div className="mt-5 flex flex-wrap gap-2"><Button size="sm" onClick={() => handleConnect(person.uid)}>Connect <ArrowRight className="h-3.5 w-3.5"/></Button><button onClick={() => setSerendipityIndex(value => (value + 1) % suggestions.length)} className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-[#aaa99f] hover:border-[#c8a96c]/35 hover:text-white"><Shuffle className="h-3.5 w-3.5"/> Reveal another</button></div></div></div>
        </section>;
      })()}

      <Tabs defaultValue="suggested">
        <TabsList>
          <TabsTrigger value="suggested">AI Suggested</TabsTrigger>
          <TabsTrigger value="pending">Requests ({pending.length})</TabsTrigger>
          <TabsTrigger value="connections">Connections ({accepted.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="suggested">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((s) => (
              <Card key={s.uid} className="transition-all hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <UserAvatar name={s.displayName} photoURL={s.photoURL} size="lg" />
                    <div>
                      <p className="font-semibold text-text-primary">{s.displayName}</p>
                      <p className="text-xs text-text-secondary line-clamp-2">{s.headline}</p>
                      <Badge variant="ai" className="mt-2">{s.matchScore}% match</Badge>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-text-tertiary">{s.matchReason}</p>
                  <Button size="sm" className="mt-4 w-full gap-1" onClick={() => handleConnect(s.uid)}>
                    <UserPlus className="h-4 w-4" /> Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          {loading ? (
            <div className="flex justify-center py-12"><AuthSpinner /></div>
          ) : pending.length === 0 ? (
            <EmptyState icon={Users} title="No pending requests" description="Connection requests will appear here." />
          ) : (
            <div className="space-y-3">
              {pending.map((c) => (
                <Card key={c.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={c.profile?.displayName ?? "Member"} photoURL={c.profile?.photoURL} />
                      <div>
                        <p className="font-medium text-text-primary">{c.profile?.displayName}</p>
                        <p className="text-xs text-text-secondary">{c.profile?.headline}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleRespond(c.id, "accepted")}>Accept</Button>
                      <Button size="sm" variant="secondary" onClick={() => handleRespond(c.id, "declined")}>Decline</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="connections">
          {accepted.length === 0 ? (
            <EmptyState icon={Users} title="No connections yet" description="Start connecting with alumni from the directory." />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {accepted.map((c) => (
                <Card key={c.id}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <UserAvatar name={c.profile?.displayName ?? "Member"} photoURL={c.profile?.photoURL} showOnline isOnline />
                    <div>
                      <p className="font-medium text-text-primary">{c.profile?.displayName}</p>
                      <p className="text-xs text-text-secondary">{c.profile?.headline}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card className="border-ai/20 bg-ai-subtle/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-ai" /> AI Networking Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary">
            Based on your skills in {(user.skills ?? ["networking"]).slice(0, 3).join(", ")}, we found {suggestions.length} high-quality matches. Connect with 3+ alumni to unlock warm introduction requests.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
