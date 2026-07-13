export type RsvpStatus = "going" | "maybe" | "not_going";

export interface OrbitEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  virtual?: boolean;
  hostName: string;
  hostId: string;
  attendeeCount: number;
  maxAttendees?: number;
  tags: string[];
  imageUrl?: string;
}

export interface EventRsvp {
  eventId: string;
  userId: string;
  status: RsvpStatus;
  createdAt: string;
}
