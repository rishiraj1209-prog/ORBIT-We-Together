export type ConnectionStatus = "pending" | "accepted" | "declined";

export interface Connection {
  id: string;
  fromUid: string;
  toUid: string;
  status: ConnectionStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectionRequest extends Connection {
  fromProfile?: { displayName: string; photoURL: string | null; headline?: string };
  toProfile?: { displayName: string; photoURL: string | null; headline?: string };
}

export interface SuggestedConnection {
  uid: string;
  displayName: string;
  photoURL: string | null;
  headline?: string;
  matchScore: number;
  matchReason: string;
  mutualConnections: number;
  skills: string[];
}

export interface MatchRecommendation {
  uid: string;
  displayName: string;
  photoURL: string | null;
  headline?: string;
  matchScore: number;
  matchExplanation: string;
  sharedSkills: string[];
  sharedIndustry?: string;
  mutualConnections: number;
}
