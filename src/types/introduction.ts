export type IntroductionStatus =
  | "draft"
  | "pending"
  | "accepted"
  | "declined"
  | "completed";

export interface Introduction {
  id: string;
  requesterId: string;
  connectorId: string;
  targetId: string;
  status: IntroductionStatus;
  message: string;
  aiGeneratedMessage?: string;
  context?: string;
  createdAt: string;
  updatedAt: string;
  timeline: IntroductionTimelineEvent[];
}

export interface IntroductionTimelineEvent {
  id: string;
  status: IntroductionStatus;
  label: string;
  description?: string;
  timestamp: string;
}

export interface IntroductionPreview extends Introduction {
  requester: { displayName: string; photoURL: string | null };
  connector: { displayName: string; photoURL: string | null };
  target: { displayName: string; photoURL: string | null };
}
