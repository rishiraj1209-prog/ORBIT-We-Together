export type OpportunityType = "job" | "referral" | "internship" | "collaboration";

export interface Opportunity {
  id: string;
  type: OpportunityType;
  title: string;
  company: string;
  location: string;
  remote?: boolean;
  description: string;
  postedBy: string;
  postedByName: string;
  postedAt: string;
  tags: string[];
  salary?: string;
  deadline?: string;
  applicants?: number;
}
