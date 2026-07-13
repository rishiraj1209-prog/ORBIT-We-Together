export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startYear?: number;
  endYear?: number;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface TimelineEvent {
  id: string;
  type: "experience" | "education" | "achievement" | "connection" | "event";
  title: string;
  subtitle?: string;
  date: string;
  icon?: string;
}

export interface AlumniProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: "alumni" | "student" | "admin";
  headline?: string;
  bio?: string;
  aiSummary?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  socialLinks: SocialLinks;
  location?: string;
  industry?: string;
  graduationYear?: number;
  batch?: string;
  department?: string;
  verificationStatus: "pending" | "verified" | "rejected";
  profileCompleteness: number;
  mutualConnections?: number;
  isOnline?: boolean;
  lastActiveAt?: string;
}
