import { Schema as S, type Entity } from "@triplit/client";

const isUid = ["userId", "=", "$token.sub"] as const;

export const schema = S.Collections({
  users: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
      email: S.String(),
      emailVerified: S.Boolean({ default: false }),
      image: S.Optional(S.String()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
      church: S.String(),
      birthdate: S.Date(),
      role: S.Optional(S.String({ default: "user" })),
      banned: S.Boolean({ default: false }),
      bannedReason: S.Optional(S.String()),
      banExpires: S.Optional(S.Date()),
      stripeCustomerId: S.Optional(S.String()),
    }),
    relationships: {
      sessions: S.RelationMany("sessions", {
        where: [["userId", "=", "$id"]],
      }),
      accounts: S.RelationMany("accounts", {
        where: [["userId", "=", "$id"]],
      }),
      todos: S.RelationMany("todos", {
        //                     ↑ referenced table name
        //         ↓ field in referenced table
        where: [["userId", "=", "$id"]],
        //                        ↑ field in this table
      }),
    },
    permissions: {
      authenticated: {
        read: {
          filter: [["id", "=", "$token.sub"]],
        },
      },
    },
  },
  sessions: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.String(),
      token: S.String(),
      expiresAt: S.Date(),
      ipAddress: S.Optional(S.String()),
      userAgent: S.Optional(S.String()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
      impersonatedBy: S.Optional(S.String()),
    }),
    relationships: {
      //                      ↓ referenced table name
      user: S.RelationById("users", "$userId"),
      //                                ↑ field in this table
    },
    permissions: {
      authenticated: {
        read: {
          filter: [isUid],
        },
      },
    },
  },
  accounts: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.String(),
      accountId: S.String(),
      providerId: S.String(),
      accessToken: S.Optional(S.String()),
      refreshToken: S.Optional(S.String()),
      accessTokenExpiresAt: S.Optional(S.Date()),
      refreshTokenExpiresAt: S.Optional(S.Date()),
      scope: S.Optional(S.String()),
      idToken: S.Optional(S.String()),
      password: S.Optional(S.String()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
    relationships: {
      user: S.RelationById("users", "$userId"),
    },
    permissions: {
      authenticated: {
        read: {
          filter: [isUid],
        },
      },
    },
  },
  verifications: {
    schema: S.Schema({
      id: S.Id(),
      identifier: S.String(),
      value: S.String(),
      expiresAt: S.Date(),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
    permissions: {},
  },
  todos: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.String(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
      order: S.Number({ default: 0 }),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
    relationships: {
      //                      ↓ referenced table name
      user: S.RelationById("users", "$userId"),
      //                                ↑ field in this table
    },
    permissions: {
      authenticated: {
        read: {
          filter: [isUid],
        },
        insert: {
          filter: [isUid],
        },
        update: {
          filter: [isUid],
        },
        postUpdate: {
          filter: [
            isUid,
            ["updatedAt", ">", "$prev.updatedAt"],
            ["createdAt", "=", "$prev.createdAt"],
          ],
        },
        delete: {
          filter: [isUid],
        },
      },
    },
  },
});

export type User = Entity<typeof schema, "users">;
export type Session = Entity<typeof schema, "sessions">;
export type Account = Entity<typeof schema, "accounts">;
export type Verification = Entity<typeof schema, "verifications">;
export type Todo = Entity<typeof schema, "todos">;
