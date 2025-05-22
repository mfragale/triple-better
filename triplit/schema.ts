import { ClientSchema, Schema as S } from "@triplit/client";
import { authSchema } from "../auth-schema";

export const schema = {
  todos: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
      created_at: S.Date({ default: new Date() }),
      updated_at: S.Date({ default: new Date() }),
      order: S.Number({ default: 0 }),
    }),
  },
  ...authSchema,
} satisfies ClientSchema;
