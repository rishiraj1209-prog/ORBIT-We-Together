import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;

const requestLog = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  request: NextRequest,
  key: string
): { allowed: boolean; remaining: number; resetAt: number } {
  const identifier = `${key}:${getClientIp(request)}`;
  const now = Date.now();
  const entry = requestLog.get(identifier);

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    requestLog.set(identifier, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetAt };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  requestLog.set(identifier, entry);
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  };
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimitHeaders(result: {
  remaining: number;
  resetAt: number;
}): Record<string, string> {
  return {
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.floor(result.resetAt / 1000)),
  };
}
