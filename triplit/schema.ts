import { ClientSchema, Schema as S } from "@triplit/client";

export const schema = {
  todos: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
    }),
  },
  users: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
      email: S.String(),
      emailVerified: S.Boolean(),
      image: S.String(),
      createdAt: S.Date(),
      updatedAt: S.Date(),
    }),
    relationships: {
      sessions: S.RelationMany("sessions", {
        where: [["userId", "=", "$id"]],
      }),
      accounts: S.RelationMany("accounts", {
        where: [["userId", "=", "$id"]],
      }),
    },
  },
  sessions: {
    schema: S.Schema({
      id: S.Id(),
      expiresAt: S.Date(),
      token: S.String(),
      createdAt: S.Date(),
      updatedAt: S.Date(),
      ipAddress: S.String(),
      userAgent: S.String(),
      userId: S.String(),
    }),
  },
  accounts: {
    schema: S.Schema({
      id: S.Id(),
      accountId: S.String(),
      providerId: S.String(),
      userId: S.String(),
      accessToken: S.String(),
      refreshToken: S.String(),
      idToken: S.String(),
      accessTokenExpiresAt: S.Date(),
      refreshTokenExpiresAt: S.Date(),
      scope: S.String(),
      password: S.String(),
      createdAt: S.Date(),
      updatedAt: S.Date(),
    }),
  },
  verification: {
    schema: S.Schema({
      id: S.String(),
      identifier: S.String(),
      value: S.String(),
      expiresAt: S.Date(),
      createdAt: S.Date(),
      updatedAt: S.Date(),
    }),
  },
} satisfies ClientSchema;
