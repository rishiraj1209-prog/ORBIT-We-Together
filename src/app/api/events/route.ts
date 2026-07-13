import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { SEED_EVENTS } from "@/lib/data/seed-events";
import { memoryStore } from "@/lib/data/memory-store";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rsvps = memoryStore.rsvps.getByUser(user.uid);
  const events = SEED_EVENTS.map((e) => ({
    ...e,
    userRsvp: rsvps.find((r) => r.eventId === e.id)?.status ?? null,
  }));

  return NextResponse.json({ events });
}
