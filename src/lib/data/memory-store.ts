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

export function seedInitialConversations(userId: string) {
  const conv1: Conversation = {
    id: "conv-seed-001",
    participantIds: [userId, "seed-001"],
    lastMessage: "Thanks for connecting! Would love to chat about PM careers.",
    lastMessageAt: new Date(Date.now() - 1800000).toISOString(),
    unreadCount: 1,
    onlineStatus: { "seed-001": true },
  };
  const conv2: Conversation = {
    id: "conv-seed-002",
    participantIds: [userId, "seed-002"],
    lastMessage: "Let me know if you want an intro to anyone in my network.",
    lastMessageAt: new Date(Date.now() - 86400000).toISOString(),
    unreadCount: 0,
    onlineStatus: { "seed-002": false },
  };

  if (!conversations.has(conv1.id)) {
    conversations.set(conv1.id, conv1);
    messages.set(conv1.id, [
      {
        id: "msg-001",
        conversationId: conv1.id,
        senderId: "seed-001",
        content: "Hi! Great to connect on Orbit.",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        read: true,
      },
      {
        id: "msg-002",
        conversationId: conv1.id,
        senderId: "seed-001",
        content: "Thanks for connecting! Would love to chat about PM careers.",
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        read: false,
      },
    ]);
  }
  if (!conversations.has(conv2.id)) {
    conversations.set(conv2.id, conv2);
    messages.set(conv2.id, [
      {
        id: "msg-003",
        conversationId: conv2.id,
        senderId: "seed-002",
        content: "Let me know if you want an intro to anyone in my network.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        read: true,
      },
    ]);
  }
}

export function seedInitialConnections(userId: string) {
  const existing = Array.from(connections.values()).filter(
    (c) => c.fromUid === userId || c.toUid === userId
  );
  if (existing.length > 0) return;

  connections.set("conn-seed-001", {
    id: "conn-seed-001",
    fromUid: "seed-003",
    toUid: userId,
    status: "pending",
    message: "Would love to connect!",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  });

  connections.set("conn-seed-002", {
    id: "conn-seed-002",
    fromUid: userId,
    toUid: "seed-006",
    status: "accepted",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  });
}

export function seedInitialIntroductions(userId: string) {
  const existing = Array.from(introductions.values()).filter(
    (i) => i.requesterId === userId
  );
  if (existing.length > 0) return;

  introductions.set("intro-seed-001", {
    id: "intro-seed-001",
    requesterId: userId,
    connectorId: "seed-002",
    targetId: "seed-004",
    status: "pending",
    message: "I'd love an intro to Michael for VC advice.",
    aiGeneratedMessage:
      "Hi Michael, I wanted to introduce you to a fellow alumni interested in venture capital...",
    context: "Interested in VC career path",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
    timeline: [
      {
        id: "tl-1",
        status: "pending",
        label: "Request sent",
        description: "Waiting for connector approval",
        timestamp: new Date(Date.now() - 43200000).toISOString(),
      },
    ],
  });
}
