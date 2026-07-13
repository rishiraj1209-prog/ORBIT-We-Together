import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { ACHIEVEMENTS } from "@/types/referral";
import { isFirebaseAdminConfigured } from "@/lib/firebase/config";
import type { UserDocument } from "@/types/user";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let doc = null;
  if (isFirebaseAdminConfigured()) {
    const { getAdminUserDocument } = await import(
      "@/lib/firebase/admin-users"
    );
    doc = await getAdminUserDocument(user.uid);
  }
  const referralCount = doc?.referralCount ?? 0;
  const code = doc?.referralCode ?? `ORBIT-${user.uid.slice(0, 6).toUpperCase()}`;

  let users: UserDocument[] = [];
  if (isFirebaseAdminConfigured()) {
    const { listAllUsers } = await import("@/lib/firebase/profile");
    users = await listAllUsers();
  }
  const leaderboard = (user.verificationStatus === "verified" || user.role === "admin" ? users : [])
    .filter((member) => member.verificationStatus === "verified")
    .map((member) => ({
      uid: member.uid,
      displayName: member.displayName ?? "Orbit member",
      photoURL: member.photoURL,
      referralCount: member.referralCount ?? 0,
      points: (member.referralCount ?? 0) * 40,
    }))
    .sort((a, b) => b.points - a.points || a.displayName.localeCompare(b.displayName))
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
  const userRank = leaderboard.find((entry) => entry.uid === user.uid)?.rank ?? leaderboard.length + 1;

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
      pendingReferrals: 0,
      convertedReferrals: referralCount,
      rank: userRank,
      points: referralCount * 40,
    },
    leaderboard,
    achievements,
    inviteLink: `${request.nextUrl.origin}/signup?ref=${code}`,
  });
}
