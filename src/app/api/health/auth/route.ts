import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, string | boolean> = {
    clientApiKey: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    clientProjectId: Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    clientAppId: Boolean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
    adminProjectId: Boolean(process.env.FIREBASE_PROJECT_ID),
    adminClientEmail: Boolean(process.env.FIREBASE_CLIENT_EMAIL),
    adminPrivateKey: Boolean(process.env.FIREBASE_PRIVATE_KEY),
  };

  for (const [label, loader] of [
    ["sessionModule", () => import("@/lib/auth/session")],
    ["demoModule", () => import("@/lib/auth/demo")],
    ["adminUsersModule", () => import("@/lib/firebase/admin-users")],
  ] as const) {
    try {
      await loader();
      checks[label] = "loaded";
    } catch (error) {
      checks[label] = error instanceof Error
        ? `${error.name}: ${error.message}`.slice(0, 240)
        : "failed";
    }
  }

  try {
    const serverAuth = await import("@/lib/auth/server");
    checks.serverModule = "loaded";
    try {
      const user = await serverAuth.getCurrentUser();
      checks.currentUser = user ? "authenticated" : "anonymous";
    } catch (error) {
      checks.currentUser = error instanceof Error ? error.name : "failed";
    }
  } catch (error) {
    checks.serverModule = error instanceof Error
      ? `${error.name}: ${error.message}`.slice(0, 240)
      : "failed";
  }

  return NextResponse.json(checks, {
    headers: { "Cache-Control": "no-store" },
  });
}
