"use client";

import { useEffect, useState } from "react";
import { Handshake, Sparkles } from "lucide-react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/ui/empty-state";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import { cn } from "@/lib/utils/cn";
import type { AlumniProfile } from "@/types/profile";

interface IntroductionItem {
  id: string;
  status: string;
  context?: string;
  aiGeneratedMessage?: string;
  requester: { displayName: string; photoURL: string | null };
  connector: { displayName: string; photoURL: string | null };
  target: { displayName: string; photoURL: string | null };
  timeline: Array<{ label: string; description?: string; timestamp: string }>;
}

export function IntroductionsView({ profiles }: { profiles: AlumniProfile[] }) {
  const [introductions, setIntroductions] = useState<IntroductionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [connectorId, setConnectorId] = useState(profiles[0]?.uid ?? "");
  const [targetId, setTargetId] = useState(profiles[1]?.uid ?? profiles[0]?.uid ?? "");
  const [context, setContext] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/introductions")
      .then((r) => r.json())
      .then((d) => setIntroductions(d.introductions ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function generateAiMessage() {
    const res = await fetch("/api/ai/introduction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "introduction", connectorUid: connectorId, targetUid: targetId, context }),
    });
    const { message } = await res.json();
    setAiMessage(message);
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch("/api/introductions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectorId, targetId, context }),
      });
      const res = await fetch("/api/introductions");
      const d = await res.json();
      setIntroductions(d.introductions ?? []);
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  }

  const statusColors: Record<string, string> = {
    pending: "warning",
    accepted: "success",
    completed: "success",
    declined: "default",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Warm Introductions</h1>
          <p className="mt-1 text-text-secondary">Get introduced through mutual connections</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2" disabled={profiles.length < 2}>
          <Handshake className="h-4 w-4" /> Request intro
        </Button>
      </div>

      {showForm && (
        <Card className="border-accent/20">
          <CardHeader><CardTitle>New Introduction Request</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Connector (mutual)</Label>
                <Select value={connectorId} onChange={(e) => setConnectorId(e.target.value)}>
                  {profiles.map((a) => (
                    <option key={a.uid} value={a.uid}>{a.displayName}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Target alumni</Label>
                <Select value={targetId} onChange={(e) => setTargetId(e.target.value)}>
                  {profiles.filter((a) => a.uid !== connectorId).map((a) => (
                    <option key={a.uid} value={a.uid}>{a.displayName}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Context</Label>
              <Textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Why do you want this introduction?" rows={3} />
            </div>
            <Button variant="secondary" onClick={generateAiMessage} className="gap-1">
              <Sparkles className="h-4 w-4" /> Generate AI message
            </Button>
            {aiMessage && (
              <div className="rounded-lg border border-ai/20 bg-ai-subtle/20 p-4">
                <p className="mb-1 text-xs font-medium text-ai">AI Generated</p>
                <p className="whitespace-pre-wrap text-sm text-text-secondary">{aiMessage}</p>
              </div>
            )}
            <Button onClick={handleSubmit} disabled={submitting || !connectorId || !targetId}>
              {submitting ? <AuthSpinner className="text-white" /> : "Send request"}
            </Button>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><AuthSpinner /></div>
      ) : introductions.length === 0 && profiles.length < 2 ? (
        <EmptyState icon={Handshake} title="Warm introductions unlock with three members" description="Once two other real alumni join, Orbit can map a connector and a target for trusted introductions." />
      ) : introductions.length === 0 ? (
        <EmptyState icon={Handshake} title="No introductions yet" description="Request a warm introduction through a mutual connection." />
      ) : (
        <div className="space-y-4">
          {introductions.map((intro) => (
            <Card key={intro.id}>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <UserAvatar name={intro.requester.displayName} photoURL={intro.requester.photoURL} size="sm" />
                  <span className="text-text-tertiary">→</span>
                  <UserAvatar name={intro.connector.displayName} photoURL={intro.connector.photoURL} size="sm" />
                  <span className="text-text-tertiary">→</span>
                  <UserAvatar name={intro.target.displayName} photoURL={intro.target.photoURL} size="sm" />
                  <Badge variant={statusColors[intro.status] as "warning" | "success" | "default"}>{intro.status}</Badge>
                </div>
                {intro.aiGeneratedMessage && (
                  <div className="mt-4 rounded-lg border border-border bg-surface-elevated/50 p-4">
                    <p className="whitespace-pre-wrap text-sm text-text-secondary">{intro.aiGeneratedMessage}</p>
                  </div>
                )}
                <div className="mt-6 space-y-3">
                  {intro.timeline.map((event, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", i === 0 ? "bg-accent" : "bg-border")} />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{event.label}</p>
                        {event.description && <p className="text-xs text-text-secondary">{event.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
