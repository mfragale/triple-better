import { Schema as S, type Entity } from "@triplit/client";
import { authSchema } from "./auth-schema";

const isUid = ["userId", "=", "$token.sub"] as const;

export const schema = S.Collections({
  ...authSchema,
  todos: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
      created_at: S.Date({ default: new Date() }),
      updated_at: S.Date({ default: new Date() }),
      order: S.Number({ default: 0 }),
      userId: S.String(),
    }),
    relationships: {
      user: S.RelationById("users", "$userId"),
    },
    permissions: {
      authenticated: {
        read: { filter: [isUid] },
        insert: { filter: [isUid] },
        update: { filter: [isUid] },
        postUpdate: { filter: [isUid] },
        delete: { filter: [isUid] },
      },
    },
  },
});

export type Todo = Entity<typeof schema, "todos">;
export type Account = Entity<typeof schema, "accounts">;
export type User = Entity<typeof schema, "users">;
export type Session = Entity<typeof schema, "sessions">;
export type Verification = Entity<typeof schema, "verifications">;
