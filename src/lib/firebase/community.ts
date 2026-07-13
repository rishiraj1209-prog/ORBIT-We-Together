import { getAdminFirestore } from "@/lib/firebase/admin";
import type { OrbitEvent, RsvpStatus } from "@/types/event";
import type { Opportunity, OpportunityType } from "@/types/opportunity";

const EVENTS_COLLECTION = "events";
const EVENT_RSVPS_COLLECTION = "eventRsvps";
const OPPORTUNITIES_COLLECTION = "opportunities";

export type CreateEventInput = {
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  virtual?: boolean;
  maxAttendees?: number;
  tags?: string[];
};

export type CreateOpportunityInput = {
  type: OpportunityType;
  title: string;
  company: string;
  location: string;
  remote?: boolean;
  description: string;
  tags?: string[];
  salary?: string;
  deadline?: string;
};

export async function listEventsForUser(
  userId: string,
  limit = 100
): Promise<Array<OrbitEvent & { userRsvp: RsvpStatus | null }>> {
  const db = getAdminFirestore();
  const snapshot = await db.collection(EVENTS_COLLECTION).limit(limit).get();
  const events = snapshot.docs
    .map((doc) => ({ ...(doc.data() as Omit<OrbitEvent, "id">), id: doc.id }))
    .filter((event) => new Date(event.date).getTime() >= Date.now() - 86_400_000)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (events.length === 0) return [];
  const rsvps = await db.getAll(
    ...events.map((event) =>
      db.collection(EVENT_RSVPS_COLLECTION).doc(`${event.id}_${userId}`)
    )
  );
  const statusByEvent = new Map(
    rsvps
      .filter((snapshot) => snapshot.exists)
      .map((snapshot) => {
        const data = snapshot.data() as { eventId: string; status: RsvpStatus };
        return [data.eventId, data.status] as const;
      })
  );

  return events.map((event) => ({
    ...event,
    userRsvp: statusByEvent.get(event.id) ?? null,
  }));
}

export async function createEvent(
  input: CreateEventInput,
  host: { uid: string; displayName: string }
): Promise<OrbitEvent> {
  const ref = getAdminFirestore().collection(EVENTS_COLLECTION).doc();
  const event: OrbitEvent = {
    id: ref.id,
    ...input,
    hostId: host.uid,
    hostName: host.displayName,
    attendeeCount: 0,
    tags: input.tags ?? [],
  };
  await ref.set(event);
  return event;
}

export async function setEventRsvp(
  eventId: string,
  userId: string,
  status: RsvpStatus
): Promise<void> {
  const db = getAdminFirestore();
  const eventRef = db.collection(EVENTS_COLLECTION).doc(eventId);
  const rsvpRef = db.collection(EVENT_RSVPS_COLLECTION).doc(`${eventId}_${userId}`);

  await db.runTransaction(async (transaction) => {
    const [eventSnapshot, previousRsvp] = await Promise.all([
      transaction.get(eventRef),
      transaction.get(rsvpRef),
    ]);
    if (!eventSnapshot.exists) throw new Error("Event not found");

    const event = eventSnapshot.data() as OrbitEvent;
    const previousStatus = previousRsvp.exists
      ? (previousRsvp.data() as { status: RsvpStatus }).status
      : null;
    const wasGoing = previousStatus === "going";
    const isGoing = status === "going";
    const attendeeCount = Math.max(
      0,
      (event.attendeeCount ?? 0) + (isGoing && !wasGoing ? 1 : wasGoing && !isGoing ? -1 : 0)
    );

    transaction.set(rsvpRef, {
      eventId,
      userId,
      status,
      createdAt: previousRsvp.data()?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    transaction.update(eventRef, { attendeeCount });
  });
}

export async function listOpportunities(limit = 100): Promise<Opportunity[]> {
  const snapshot = await getAdminFirestore()
    .collection(OPPORTUNITIES_COLLECTION)
    .limit(limit)
    .get();

  return snapshot.docs
    .map((doc) => ({ ...(doc.data() as Omit<Opportunity, "id">), id: doc.id }))
    .filter((opportunity) => !opportunity.deadline || new Date(opportunity.deadline).getTime() >= Date.now())
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

export async function createOpportunity(
  input: CreateOpportunityInput,
  author: { uid: string; displayName: string }
): Promise<Opportunity> {
  const ref = getAdminFirestore().collection(OPPORTUNITIES_COLLECTION).doc();
  const opportunity: Opportunity = {
    id: ref.id,
    ...input,
    postedBy: author.uid,
    postedByName: author.displayName,
    postedAt: new Date().toISOString(),
    tags: input.tags ?? [],
    applicants: 0,
  };
  await ref.set(opportunity);
  return opportunity;
}
