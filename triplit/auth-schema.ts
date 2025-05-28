import { Schema as S } from "@triplit/client";

export const authSchema = S.Collections({
  users: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
      email: S.String(),
      emailVerified: S.Boolean({ default: false }),
      image: S.Optional(S.String()),
      company: S.String(),
      age: S.Number(),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
    relationships: {
      sessions: S.RelationMany("sessions", {
        where: [["userId", "=", "$id"]],
      }),
      accounts: S.RelationMany("accounts", {
        where: [["userId", "=", "$id"]],
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
    }),
    relationships: {
      user: S.RelationById("users", "$userId"),
    },
    permissions: {
      authenticated: {
        read: {
          filter: [["userId", "=", "$token.sub"]],
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
          filter: [["userId", "=", "$token.sub"]],
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
});
