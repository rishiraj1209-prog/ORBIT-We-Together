import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/server";
import { createOpportunity, listOpportunities } from "@/lib/firebase/community";

export const runtime = "nodejs";

const opportunitySchema = z.object({
  type: z.enum(["job", "referral", "internship", "collaboration"]),
  title: z.string().trim().min(3).max(120),
  company: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(120),
  remote: z.boolean().optional(),
  description: z.string().trim().min(10).max(3000),
  tags: z.array(z.string().trim().min(1).max(30)).max(10).optional(),
  salary: z.string().trim().max(80).optional(),
  deadline: z.string().optional(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ opportunities: await listOpportunities() });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const input = opportunitySchema.parse(await request.json());
    const opportunity = await createOpportunity(input, {
      uid: user.uid,
      displayName: user.displayName ?? "Orbit member",
    });
    return NextResponse.json({ opportunity }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please complete all required opportunity details." }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to publish opportunity." }, { status: 500 });
  }
}
