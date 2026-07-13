export {
  extractSkillsFromText,
  parseResumeText,
  generateProfileSummary,
  calculateProfileCompleteness,
} from "@/lib/ai/profile";
export type { ParsedResume } from "@/lib/ai/profile";
export {
  computeMatchScore,
  generateMatchExplanation,
  getMatchRecommendations,
  getSuggestedConnections,
  semanticSearch,
} from "@/lib/ai/matching";
export {
  generateIntroductionMessage,
  composeMessageAssist,
  generateSmartInsights,
} from "@/lib/ai/compose";
