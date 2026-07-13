import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/server";
import { createEvent, listEventsForUser } from "@/lib/firebase/community";

export const runtime = "nodejs";

const eventSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(2000),
  date: z.string().refine((value) => !Number.isNaN(new Date(value).getTime())),
  endDate: z.string().optional(),
  location: z.string().trim().min(2).max(160),
  virtual: z.boolean().optional(),
  maxAttendees: z.number().int().positive().max(100_000).optional(),
  tags: z.array(z.string().trim().min(1).max(30)).max(8).optional(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });

  const events = await listEventsForUser(user.uid);
  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.verificationStatus !== "verified" && user.role !== "admin") return NextResponse.json({ error: "Verification required" }, { status: 403 });

  try {
    const input = eventSchema.parse(await request.json());
    const event = await createEvent(input, {
      uid: user.uid,
      displayName: user.displayName ?? "Orbit member",
    });
    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please complete all required event details." }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to create event." }, { status: 500 });
  }
}
