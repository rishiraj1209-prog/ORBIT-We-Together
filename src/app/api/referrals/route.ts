import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { ACHIEVEMENTS } from "@/types/referral";
import { SEED_ALUMNI } from "@/lib/data/seed-alumni";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let doc = null;
  if (isFirebaseAdminConfigured()) {
    const { getAdminUserDocument } = await import(
      "@/lib/firebase/admin-users"
    );
    doc = await getAdminUserDocument(user.uid);
  }
  const referralCount = doc?.referralCount ?? 2;
  const code = doc?.referralCode ?? `ORBIT-${user.uid.slice(0, 6).toUpperCase()}`;

  const leaderboard = [
    { rank: 1, uid: "seed-011", displayName: "Nina Kowalski", photoURL: null, referralCount: 12, points: 480 },
    { rank: 2, uid: "seed-001", displayName: "Priya Sharma", photoURL: null, referralCount: 9, points: 360 },
    { rank: 3, uid: user.uid, displayName: user.displayName ?? "You", photoURL: user.photoURL, referralCount, points: referralCount * 40 },
    ...SEED_ALUMNI.slice(0, 5).map((a, i) => ({
      rank: i + 4,
      uid: a.uid,
      displayName: a.displayName,
      photoURL: a.photoURL,
      referralCount: Math.max(1, 7 - i),
      points: Math.max(40, (7 - i) * 40),
    })),
  ].sort((a, b) => a.rank - b.rank);

  const achievements = ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked:
      (a.id === "first-referral" && referralCount >= 1) ||
      (a.id === "five-referrals" && referralCount >= 5) ||
      (a.id === "profile-complete" && (doc?.profileCompleteness ?? 0) >= 100),
    progress:
      a.id === "five-referrals" ? referralCount :
      a.id === "profile-complete" ? (doc?.profileCompleteness ?? 50) :
      referralCount,
  }));

  return NextResponse.json({
    stats: {
      referralCode: code,
      totalReferrals: referralCount,
      pendingReferrals: 1,
      convertedReferrals: referralCount - 1,
      rank: 3,
      points: referralCount * 40,
    },
    leaderboard,
    achievements,
    inviteLink: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/signup?ref=${code}`,
  });
}
