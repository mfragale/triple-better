import { Schema as S, type Entity } from "@triplit/client";
import { authSchema } from "./auth-schema";

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
        read: { filter: [["userId", "=", "$token.sub"]] },
        insert: { filter: [["userId", "=", "$token.sub"]] },
        update: { filter: [["userId", "=", "$token.sub"]] },
        postUpdate: { filter: [["userId", "=", "$token.sub"]] },
        delete: { filter: [["userId", "=", "$token.sub"]] },
      },
    },
  },
});

export type Todo = Entity<typeof schema, "todos">;
export type Account = Entity<typeof schema, "accounts">;
export type User = Entity<typeof schema, "users">;
export type Session = Entity<typeof schema, "sessions">;
export type Verification = Entity<typeof schema, "verifications">;
