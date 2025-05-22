import { ClientSchema, Schema as S } from "@triplit/client";
import { authSchema } from "../auth-schema";

export const schema = {
  todos: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
    }),
  },
  ...authSchema,
} satisfies ClientSchema;
