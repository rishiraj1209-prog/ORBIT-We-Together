export type ResumeAnalysis = {
  atsScore: number;
  resumeScore: number;
  extractedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
};

export function analyzeResumeText(text: string): ResumeAnalysis {
  const lower = text.toLowerCase();

  const skills = [
    "react",
    "next.js",
    "typescript",
    "javascript",
    "python",
    "firebase",
    "machine learning",
    "ai",
    "sql",
    "git",
    "github",
    "node.js",
    "tailwind",
    "data structures",
  ];

  const extractedSkills = skills.filter((skill) => lower.includes(skill));

  const missingSkills = skills
    .filter((skill) => !lower.includes(skill))
    .slice(0, 6);

  const atsScore = Math.min(95, 45 + extractedSkills.length * 6);
  const resumeScore = Math.min(98, 50 + extractedSkills.length * 5);

  return {
    atsScore,
    resumeScore,
    extractedSkills,
    missingSkills,
    strengths: [
      "Clear technical direction",
      "Relevant project experience",
      "Good foundation for internship applications",
    ],
    improvements: [
      "Add measurable impact to project bullet points",
      "Use stronger action verbs",
      "Add links to GitHub and deployed projects",
      "Tailor keywords for each target role",
    ],
  };
}