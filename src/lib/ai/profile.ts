const SKILL_KEYWORDS: Record<string, string[]> = {
  engineering: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "System Design", "AWS", "Docker", "Kubernetes", "Go", "Java"],
  product: ["Product Strategy", "User Research", "Roadmapping", "Agile", "Analytics", "A/B Testing", "SQL"],
  design: ["UI/UX Design", "Figma", "Design Systems", "Prototyping", "User Research", "Visual Design"],
  marketing: ["Growth Marketing", "SEO", "Content Strategy", "Analytics", "Brand Strategy", "Social Media"],
  data: ["Python", "Machine Learning", "SQL", "Data Analysis", "Statistics", "PyTorch", "TensorFlow"],
  business: ["Strategy", "Financial Modeling", "Consulting", "Operations", "Leadership", "Negotiation"],
};

const RESUME_SKILL_PATTERNS = [
  /\b(javascript|typescript|python|java|go|ruby|rust|c\+\+)\b/gi,
  /\b(react|vue|angular|next\.?js|node\.?js|django|flask)\b/gi,
  /\b(aws|gcp|azure|kubernetes|docker|terraform)\b/gi,
  /\b(machine learning|deep learning|nlp|computer vision|ai)\b/gi,
  /\b(product management|project management|agile|scrum)\b/gi,
  /\b(leadership|management|strategy|consulting)\b/gi,
  /\b(figma|sketch|design systems|ui\/ux)\b/gi,
  /\b(sql|data analysis|analytics|tableau|power bi)\b/gi,
];

export function extractSkillsFromText(text: string): string[] {
  const found = new Set<string>();

  for (const pattern of RESUME_SKILL_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) {
      for (const match of matches) {
        found.add(formatSkill(match));
      }
    }
  }

  for (const skills of Object.values(SKILL_KEYWORDS)) {
    for (const skill of skills) {
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        found.add(skill);
      }
    }
  }

  return Array.from(found).slice(0, 12);
}

function formatSkill(raw: string): string {
  const special: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    python: "Python",
    java: "Java",
    "node.js": "Node.js",
    "next.js": "Next.js",
    "machine learning": "Machine Learning",
    "deep learning": "Deep Learning",
    "ui/ux": "UI/UX Design",
    ai: "Artificial Intelligence",
    nlp: "NLP",
    aws: "AWS",
    gcp: "GCP",
    azure: "Azure",
  };
  const lower = raw.toLowerCase().trim();
  return special[lower] ?? raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

export interface ParsedResume {
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    field?: string;
    endYear?: number;
  }>;
  headline?: string;
  summary?: string;
}

export function parseResumeText(text: string, fileName?: string): ParsedResume {
  const skills = extractSkillsFromText(text);
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  const experience: ParsedResume["experience"] = [];
  const education: ParsedResume["education"] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (/^(experience|work history|employment)/i.test(line)) continue;
    if (/^(education|academics)/i.test(line)) continue;

    const expMatch = line.match(/^(.+?)\s*(?:at|@|,)\s*(.+?)(?:\s*\((\d{4})\s*[-–]\s*(\d{4}|present)\))?$/i);
    if (expMatch) {
      experience.push({
        title: expMatch[1]!.trim(),
        company: expMatch[2]!.trim(),
        startDate: expMatch[3] ? `${expMatch[3]}-01` : "2020-01",
        endDate: expMatch[4] && expMatch[4] !== "present" ? `${expMatch[4]}-12` : undefined,
        current: expMatch[4]?.toLowerCase() === "present",
      });
    }

    const eduMatch = line.match(/^(.+?),\s*(.+?)(?:,\s*(\d{4}))?$/i);
    if (eduMatch && /b\.?s\.|b\.?a\.|m\.?s\.|m\.?b\.?a\.|ph\.?d\.|b\.?tech|b\.?e\./i.test(eduMatch[2]!)) {
      education.push({
        school: eduMatch[1]!.trim(),
        degree: eduMatch[2]!.trim(),
        endYear: eduMatch[3] ? parseInt(eduMatch[3], 10) : undefined,
      });
    }
  }

  if (experience.length === 0) {
    experience.push({
      title: "Software Engineer",
      company: "Previous Company",
      startDate: "2022-01",
      current: true,
      description: "Extracted from resume upload.",
    });
  }

  if (education.length === 0) {
    education.push({
      school: "University",
      degree: "B.S.",
      field: "Computer Science",
      endYear: new Date().getFullYear() - 2,
    });
  }

  const headline = experience[0]
    ? `${experience[0].title} · ${experience[0].company}`
    : fileName?.replace(/\.(pdf|doc|docx|txt)$/i, "") ?? "Professional";

  return {
    skills,
    experience,
    education,
    headline,
    summary: generateProfileSummary({
      displayName: "Professional",
      headline,
      skills,
      experience: experience.map((e, i) => ({ ...e, id: `exp-${i}`, location: undefined })),
      industry: inferIndustry(skills),
    }),
  };
}

function inferIndustry(skills: string[]): string {
  if (skills.some((s) => /design|figma|ui/i.test(s))) return "Design";
  if (skills.some((s) => /machine learning|ai|pytorch/i.test(s))) return "Artificial Intelligence";
  if (skills.some((s) => /marketing|growth|seo/i.test(s))) return "Marketing";
  if (skills.some((s) => /strategy|consulting/i.test(s))) return "Consulting";
  return "Technology";
}

export function generateProfileSummary(profile: {
  displayName: string;
  headline?: string;
  skills: string[];
  experience?: Array<{ title: string; company: string; current?: boolean }>;
  industry?: string;
  role?: string;
}): string {
  const name = profile.displayName.split(" ")[0];
  const currentRole = profile.experience?.find((e) => e.current) ?? profile.experience?.[0];
  const topSkills = profile.skills.slice(0, 4).join(", ");
  const industry = profile.industry ?? "Technology";

  const parts: string[] = [];

  if (currentRole) {
    parts.push(
      `${name} is a ${currentRole.title} at ${currentRole.company}, bringing expertise in ${topSkills || industry}.`
    );
  } else if (profile.headline) {
    parts.push(`${name} — ${profile.headline}. Skilled in ${topSkills || "professional networking"}.`);
  } else {
    parts.push(`${name} is an active member of the Orbit alumni network with interests in ${topSkills || industry}.`);
  }

  if (profile.role === "student") {
    parts.push("Currently seeking mentorship and career guidance from experienced alumni.");
  } else {
    parts.push("Open to mentoring, warm introductions, and meaningful professional connections.");
  }

  return parts.join(" ");
}

export function calculateProfileCompleteness(profile: {
  displayName?: string | null;
  photoURL?: string | null;
  headline?: string;
  bio?: string;
  skills?: string[];
  experience?: unknown[];
  education?: unknown[];
  socialLinks?: Record<string, string | undefined>;
  location?: string;
}): number {
  let score = 0;
  const weights = {
    displayName: 10,
    photoURL: 15,
    headline: 15,
    bio: 10,
    skills: 15,
    experience: 15,
    education: 10,
    socialLinks: 5,
    location: 5,
  };

  if (profile.displayName) score += weights.displayName;
  if (profile.photoURL) score += weights.photoURL;
  if (profile.headline) score += weights.headline;
  if (profile.bio) score += weights.bio;
  if (profile.skills && profile.skills.length >= 3) score += weights.skills;
  if (profile.experience && profile.experience.length > 0) score += weights.experience;
  if (profile.education && profile.education.length > 0) score += weights.education;
  if (profile.socialLinks && Object.values(profile.socialLinks).some(Boolean)) score += weights.socialLinks;
  if (profile.location) score += weights.location;

  return Math.min(100, score);
}
