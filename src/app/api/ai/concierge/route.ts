import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";

export const runtime = "nodejs";

const answers = [
  { test: /intro|introduc|connect/i, answer: "I’d start with your highest-trust path, not the highest match score. I found three promising people in your Network view. Open the first profile, confirm the shared context, then use Request intro—I’ll help shape the message around mutual value.", action: "/app/network", label: "Open trust paths" },
  { test: /job|role|opportun|career/i, answer: "Your strongest opportunity signal is where your skills overlap with alumni at growing teams. I’d review the curated opportunities, then ask for context from an alumnus before applying. That sequence usually creates a much warmer entry.", action: "/app/opportunities", label: "Explore opportunities" },
  { test: /event|meet|calendar/i, answer: "There are upcoming moments where your network will naturally concentrate. Pick one event, then I can help you identify two people worth meeting before you arrive—one obvious match and one serendipitous one.", action: "/app/events", label: "See upcoming moments" },
  { test: /profile|visible|brand/i, answer: "Your profile should make one thing unmistakable: what conversation you’re uniquely useful for. Tighten your headline, add three proof-rich skills, and state what you’re open to. That gives Orbit a much stronger signal to match against.", action: "/app/profile/edit", label: "Refine your signal" },
];

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { message = "" } = await request.json() as { message?: string };
  const match = answers.find(item => item.test.test(message));
  return NextResponse.json(match ?? { answer: `I’m reading that as a request for momentum, ${user.displayName?.split(" ")[0] ?? "there"}. The fastest useful move is to inspect your relationship graph, choose one high-context connection, and act while the timing is warm. I can also help with an introduction, opportunity, event, or your profile.`, action: "/app/network", label: "View relationship graph" });
}
