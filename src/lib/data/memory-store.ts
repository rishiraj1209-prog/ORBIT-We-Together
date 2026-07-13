import type { Connection } from "@/types/social";
import type { Introduction } from "@/types/introduction";
import type { Conversation, Message } from "@/types/message";
import type { EventRsvp } from "@/types/event";
import type { AppNotification } from "@/types/notification";
import type { AdminReport } from "@/types/activity";

const connections = new Map<string, Connection>();
const introductions = new Map<string, Introduction>();
const conversations = new Map<string, Conversation>();
const messages = new Map<string, Message[]>();
const rsvps = new Map<string, EventRsvp>();
const notifications = new Map<string, AppNotification[]>();
const reports = new Map<string, AdminReport>();

function key(...parts: string[]) {
  return parts.join(":");
}

export const memoryStore = {
  connections: {
    getAll: () => Array.from(connections.values()),
    getByUser: (uid: string) =>
      Array.from(connections.values()).filter(
        (c) => c.fromUid === uid || c.toUid === uid
      ),
    get: (id: string) => connections.get(id),
    set: (conn: Connection) => connections.set(conn.id, conn),
    delete: (id: string) => connections.delete(id),
  },
  introductions: {
    getAll: () => Array.from(introductions.values()),
    getByUser: (uid: string) =>
      Array.from(introductions.values()).filter(
        (i) => i.requesterId === uid || i.connectorId === uid || i.targetId === uid
      ),
    get: (id: string) => introductions.get(id),
    set: (intro: Introduction) => introductions.set(intro.id, intro),
  },
  conversations: {
    getAll: () => Array.from(conversations.values()),
    getByUser: (uid: string) =>
      Array.from(conversations.values()).filter((c) =>
        c.participantIds.includes(uid)
      ),
    get: (id: string) => conversations.get(id),
    set: (conv: Conversation) => conversations.set(conv.id, conv),
  },
  messages: {
    getAll: () => Array.from(messages.values()).flat(),
    get: (conversationId: string) => messages.get(conversationId) ?? [],
    add: (msg: Message) => {
      const existing = messages.get(msg.conversationId) ?? [];
      messages.set(msg.conversationId, [...existing, msg]);
    },
  },
  rsvps: {
    get: (eventId: string, userId: string) => rsvps.get(key(eventId, userId)),
    set: (rsvp: EventRsvp) => rsvps.set(key(rsvp.eventId, rsvp.userId), rsvp),
    getByUser: (userId: string) =>
      Array.from(rsvps.values()).filter((r) => r.userId === userId),
  },
  notifications: {
    getByUser: (userId: string) => notifications.get(userId) ?? [],
    set: (userId: string, items: AppNotification[]) =>
      notifications.set(userId, items),
    add: (notif: AppNotification) => {
      const existing = notifications.get(notif.userId) ?? [];
      notifications.set(notif.userId, [notif, ...existing]);
    },
  },
  reports: {
    getAll: () => Array.from(reports.values()),
    set: (report: AdminReport) => reports.set(report.id, report),
  },
};

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
