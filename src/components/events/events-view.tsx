"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Plus, Users, Video, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import type { OrbitEvent, RsvpStatus } from "@/types/event";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function EventsView() {
  const [events, setEvents] = useState<(OrbitEvent & { userRsvp: RsvpStatus | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "", tags: "", virtual: false });

  async function loadEvents() {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data.events ?? []);
  }

  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data.events ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: new Date(form.date).toISOString(),
          tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to create event.");
      await loadEvents();
      setForm({ title: "", description: "", date: "", location: "", tags: "", virtual: false });
      setShowForm(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to create event.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRsvp(eventId: string, status: RsvpStatus) {
    await fetch(`/api/events/${eventId}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const res = await fetch("/api/events");
    const d = await res.json();
    setEvents(d.events ?? []);
  }

  const grouped = events.reduce<Record<string, typeof events>>((acc, evt) => {
    const month = new Date(evt.date).toLocaleString("default", { month: "long", year: "numeric" });
    if (!acc[month]) acc[month] = [];
    acc[month].push(evt);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Events</h1>
          <p className="mt-1 text-text-secondary">Real gatherings created by your alumni community</p>
        </div>
        <Button onClick={() => setShowForm((value) => !value)} className="gap-2">
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}{showForm ? "Close" : "Host an event"}
        </Button>
      </div>

      {showForm && <form onSubmit={handleCreate} className="rounded-[26px] border border-gold/25 bg-surface p-6 shadow-sm">
        <div className="mb-5"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-gold">Community publishing</p><h2 className="mt-2 text-xl font-medium">Create a real Orbit event</h2></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="event-title">Title</Label><Input id="event-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Alumni founders roundtable" /></div>
          <div className="space-y-2"><Label htmlFor="event-date">Date and time</Label><Input id="event-date" type="datetime-local" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="event-location">Location</Label><Input id="event-location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Campus hall or meeting link" /></div>
          <div className="space-y-2"><Label htmlFor="event-tags">Tags</Label><Input id="event-tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Founders, AI, Bengaluru" /></div>
        </div>
        <div className="mt-4 space-y-2"><Label htmlFor="event-description">Description</Label><Textarea id="event-description" required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What will members learn and who should attend?" /></div>
        <label className="mt-4 flex items-center gap-2 text-sm text-text-secondary"><input type="checkbox" checked={form.virtual} onChange={(e) => setForm({ ...form, virtual: e.target.checked })} /> This is a virtual event</label>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={submitting} className="mt-5">{submitting ? "Publishing…" : "Publish event"}</Button>
      </form>}

      {loading ? (
        <div className="flex justify-center py-12"><AuthSpinner /></div>
      ) : events.length === 0 ? (
        <EmptyState icon={Calendar} title="No real events yet" description="Host the first gathering for your alumni community." action={<Button onClick={() => setShowForm(true)}>Host the first event</Button>} />
      ) : (
        Object.entries(grouped).map(([month, monthEvents]) => (
          <div key={month}>
            <h2 className="mb-4 text-lg font-semibold text-text-primary">{month}</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {monthEvents.map((evt) => (
                <Card key={evt.id} className={cn("overflow-hidden transition-all hover:shadow-md", evt.userRsvp === "going" && "border-accent/40")}>
                  <div className="h-2 bg-gradient-to-r from-accent to-ai" />
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {evt.virtual && <Badge variant="ai"><Video className="mr-1 h-3 w-3" />Virtual</Badge>}
                      {evt.tags.slice(0, 2).map((t) => <Badge key={t} variant="default">{t}</Badge>)}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-text-primary">{evt.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary line-clamp-2">{evt.description}</p>
                    <div className="mt-4 space-y-1 text-sm text-text-tertiary">
                      <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(evt.date).toLocaleString()}</p>
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{evt.location}</p>
                      <p className="flex items-center gap-2"><Users className="h-4 w-4" />{evt.attendeeCount}{evt.maxAttendees ? ` / ${evt.maxAttendees}` : ""} attending</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant={evt.userRsvp === "going" ? "primary" : "secondary"}
                        onClick={() => handleRsvp(evt.id, "going")}
                      >
                        Going
                      </Button>
                      <Button
                        size="sm"
                        variant={evt.userRsvp === "maybe" ? "primary" : "secondary"}
                        onClick={() => handleRsvp(evt.id, "maybe")}
                      >
                        Maybe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
