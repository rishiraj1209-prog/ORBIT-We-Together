import type { AlumniProfile } from "@/types/profile";
import type { MatchRecommendation, SuggestedConnection } from "@/types/social";

export function computeMatchScore(
  userSkills: string[],
  userIndustry: string | undefined,
  alumni: AlumniProfile
): number {
  let score = 50;

  const sharedSkills = userSkills.filter((s) =>
    alumni.skills.some((as) => as.toLowerCase() === s.toLowerCase())
  );
  score += sharedSkills.length * 8;

  if (userIndustry && alumni.industry?.toLowerCase() === userIndustry.toLowerCase()) {
    score += 15;
  }

  if (alumni.mutualConnections && alumni.mutualConnections > 0) {
    score += Math.min(alumni.mutualConnections * 3, 15);
  }

  if (alumni.verificationStatus === "verified") score += 5;

  return Math.min(99, Math.max(60, score));
}

export function generateMatchExplanation(
  userName: string,
  alumni: AlumniProfile,
  sharedSkills: string[]
): string {
  const reasons: string[] = [];

  if (sharedSkills.length > 0) {
    reasons.push(`You both specialize in ${sharedSkills.slice(0, 3).join(", ")}`);
  }

  if (alumni.industry) {
    reasons.push(`both work in ${alumni.industry}`);
  }

  if (alumni.mutualConnections && alumni.mutualConnections > 0) {
    reasons.push(`share ${alumni.mutualConnections} mutual connection${alumni.mutualConnections > 1 ? "s" : ""}`);
  }

  if (alumni.role === "alumni" && alumni.headline?.includes("Manager")) {
    reasons.push("could be a great mentor for your career goals");
  }

  if (reasons.length === 0) {
    return `${alumni.displayName} is an active verified alumni who could expand your network in meaningful ways.`;
  }

  return `${userName} and ${alumni.displayName.split(" ")[0]} ${reasons.join(", ")} — a strong networking match.`;
}

export function getMatchRecommendations(
  userSkills: string[],
  userIndustry: string | undefined,
  userName: string,
  alumni: AlumniProfile[],
  excludeUid?: string,
  limit = 4
): MatchRecommendation[] {
  return alumni
    .filter((a) => a.uid !== excludeUid)
    .map((a) => {
      const sharedSkills = userSkills.filter((s) =>
        a.skills.some((as) => as.toLowerCase() === s.toLowerCase())
      );
      const matchScore = computeMatchScore(userSkills, userIndustry, a);
      return {
        uid: a.uid,
        displayName: a.displayName,
        photoURL: a.photoURL,
        headline: a.headline,
        matchScore,
        matchExplanation: generateMatchExplanation(userName, a, sharedSkills),
        sharedSkills,
        sharedIndustry: a.industry,
        mutualConnections: a.mutualConnections ?? 0,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

export function getSuggestedConnections(
  userSkills: string[],
  userIndustry: string | undefined,
  alumni: AlumniProfile[],
  excludeUid?: string,
  limit = 6
): SuggestedConnection[] {
  return getMatchRecommendations(userSkills, userIndustry, "You", alumni, excludeUid, limit).map(
    (m) => ({
      uid: m.uid,
      displayName: m.displayName,
      photoURL: m.photoURL,
      headline: m.headline,
      matchScore: m.matchScore,
      matchReason: m.matchExplanation,
      mutualConnections: m.mutualConnections,
      skills: m.sharedSkills,
    })
  );
}

export function semanticSearch(query: string, alumni: AlumniProfile[]): AlumniProfile[] {
  const q = query.toLowerCase().trim();
  if (!q) return alumni;

  const terms = q.split(/\s+/);
  const scored = alumni.map((a) => {
    const searchable = [
      a.displayName,
      a.headline,
      a.bio,
      a.aiSummary,
      a.industry,
      a.location,
      ...a.skills,
      ...a.experience.map((e) => `${e.title} ${e.company}`),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (searchable.includes(term)) score += 10;
      if (a.skills.some((s) => s.toLowerCase().includes(term))) score += 15;
      if (a.headline?.toLowerCase().includes(term)) score += 12;
    }
    return { alumni: a, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.alumni);
}
