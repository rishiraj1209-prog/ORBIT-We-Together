export function generateIntroductionMessage(params: {
  requesterName: string;
  connectorName: string;
  targetName: string;
  context?: string;
  requesterHeadline?: string;
  targetHeadline?: string;
}): string {
  const { requesterName, connectorName, targetName, context, requesterHeadline, targetHeadline } =
    params;

  const requesterFirst = requesterName.split(" ")[0];
  const targetFirst = targetName.split(" ")[0];

  const intro = `Hi ${targetFirst},\n\nI wanted to introduce you to ${requesterName}${requesterHeadline ? ` (${requesterHeadline})` : ""}. `;

  const contextLine = context
    ? `${requesterFirst} mentioned: "${context}" — I think you'd have a great conversation given your background${targetHeadline ? ` in ${targetHeadline.split("·")[0]?.trim()}` : ""}.\n\n`
    : `I think you two would benefit from connecting — ${requesterFirst} is looking to expand their network in meaningful ways.\n\n`;

  const closing = `${requesterFirst}, meet ${targetFirst}. ${targetFirst}, meet ${requesterFirst}.\n\nI'll let you two take it from here!\n\nBest,\n${connectorName.split(" ")[0]}`;

  return intro + contextLine + closing;
}

export function composeMessageAssist(params: {
  recipientName: string;
  senderName: string;
  purpose: "networking" | "follow_up" | "thank_you" | "introduction";
  context?: string;
}): string {
  const { recipientName, senderName, purpose, context } = params;
  const recipientFirst = recipientName.split(" ")[0];
  const senderFirst = senderName.split(" ")[0];

  switch (purpose) {
    case "networking":
      return `Hi ${recipientFirst},\n\nI'm ${senderFirst} — fellow alumni on Orbit. ${context ?? "I came across your profile and would love to connect and learn about your journey."}\n\nWould you be open to a brief chat sometime this week?\n\nBest,\n${senderFirst}`;
    case "follow_up":
      return `Hi ${recipientFirst},\n\nJust following up on our earlier conversation. ${context ?? "I'd still love to connect when you have a moment."}\n\nBest,\n${senderFirst}`;
    case "thank_you":
      return `Hi ${recipientFirst},\n\nThank you for taking the time to connect. ${context ?? "I really appreciated the insights you shared."}\n\nLooking forward to staying in touch!\n\nBest,\n${senderFirst}`;
    case "introduction":
      return `Hi ${recipientFirst},\n\n${context ?? "I was referred to you through our alumni network and would love to introduce myself."}\n\nBest,\n${senderFirst}`;
    default:
      return `Hi ${recipientFirst},\n\n${context ?? "I'd love to connect."}\n\nBest,\n${senderFirst}`;
  }
}

export function generateSmartInsights(profile: {
  skills: string[];
  industry?: string;
  profileCompleteness: number;
  connectionCount: number;
}): string[] {
  const insights: string[] = [];

  if (profile.profileCompleteness < 80) {
    insights.push(`Complete your profile to unlock ${100 - profile.profileCompleteness}% more match visibility.`);
  }

  if (profile.skills.length < 5) {
    insights.push("Add more skills so Orbit can explain stronger, more relevant matches.");
  }

  if (profile.connectionCount < 5) {
    insights.push("Build a few trusted connections to unlock useful warm-introduction paths.");
  }

  if (insights.length === 0) {
    insights.push("Your profile is ready. New recommendations will appear as real members join your network.");
  }

  return insights;
}
