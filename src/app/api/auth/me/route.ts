import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { checkRateLimit, rateLimitHeaders } from "@/lib/auth/rate-limit";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request, "auth-me");

  const user = await getCurrentUser();

  return NextResponse.json(
    { user },
    { headers: rateLimitHeaders(rateLimit) }
  );
}
