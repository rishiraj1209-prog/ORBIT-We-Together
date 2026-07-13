import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { setEventRsvp } from "@/lib/firebase/community";
import type { RsvpStatus } from "@/types/event";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: eventId } = await params;
  const { status } = (await request.json()) as { status?: RsvpStatus };

  if (!status) return NextResponse.json({ error: "Missing status" }, { status: 400 });

  if (!["going", "maybe", "not_going"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    await setEventRsvp(eventId, user.uid, status);
    return NextResponse.json({ rsvp: { eventId, userId: user.uid, status } });
  } catch {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
}
