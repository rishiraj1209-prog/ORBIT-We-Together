import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { composeMessageAssist, generateIntroductionMessage } from "@/lib/ai/compose";
import { getAdminUserDocuments } from "@/lib/firebase/admin-users";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    type?: "compose" | "introduction";
    purpose?: "networking" | "follow_up" | "thank_you" | "introduction";
    recipientName?: string;
    context?: string;
    connectorName?: string;
    targetUid?: string;
    connectorUid?: string;
  };

  if (body.type === "introduction") {
    const targetUid = body.targetUid ?? "";
    const connectorUid = body.connectorUid ?? "";
    const profiles = await getAdminUserDocuments([targetUid, connectorUid]);
    const target = profiles.get(targetUid);
    const connector = profiles.get(connectorUid);
    const message = generateIntroductionMessage({
      requesterName: user.displayName ?? "Alumni",
      connectorName: body.connectorName ?? connector?.displayName ?? "Connector",
      targetName: target?.displayName ?? "Alumni",
      context: body.context,
      requesterHeadline: user.headline ?? undefined,
      targetHeadline: target?.headline,
    });
    return NextResponse.json({ message });
  }

  const message = composeMessageAssist({
    recipientName: body.recipientName ?? "there",
    senderName: user.displayName ?? "Member",
    purpose: body.purpose ?? "networking",
    context: body.context,
  });

  return NextResponse.json({ message });
}
