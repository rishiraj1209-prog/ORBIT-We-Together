import { UserProfile } from "./profile";

export type DashboardStats = {
  profileCompletion: number;
  skillsCount: number;
  aiReadiness: number;
  careerGoal: string;
};

export function getDashboardStats(
  profile: UserProfile | null
): DashboardStats {
  if (!profile) {
    return {
      profileCompletion: 0,
      skillsCount: 0,
      aiReadiness: 0,
      careerGoal: "Not Set",
    };
  }

  const fields = [
    profile.name,
    profile.college,
    profile.branch,
    profile.graduationYear,
    profile.dreamCompany,
    profile.skills,
    profile.bio,
  ];

  const completed = fields.filter(
    (field) => field && field.toString().trim() !== ""
  ).length;

  const profileCompletion = Math.round((completed / fields.length) * 100);

  const skillsCount = profile.skills
    ? profile.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean).length
    : 0;

  let aiReadiness = profileCompletion;

  aiReadiness += Math.min(skillsCount * 3, 20);

  if (profile.dreamCompany) aiReadiness += 5;

  aiReadiness = Math.min(aiReadiness, 100);

  return {
    profileCompletion,
    skillsCount,
    aiReadiness,
    careerGoal: profile.dreamCompany || "Not Set",
  };
}