"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { AuthSpinner } from "@/components/auth/auth-spinner";
import type { OrbitEvent, RsvpStatus } from "@/types/event";
import { cn } from "@/lib/utils/cn";

export function EventsView() {
  const [events, setEvents] = useState<(OrbitEvent & { userRsvp: RsvpStatus | null })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((d) => setEvents(d.events ?? []))
      .finally(() => setLoading(false));
  }, []);

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
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Events</h1>
        <p className="mt-1 text-text-secondary">Alumni events, workshops, and networking mixers</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><AuthSpinner /></div>
      ) : events.length === 0 ? (
        <EmptyState icon={Calendar} title="No upcoming events" description="New events will be announced soon." />
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
