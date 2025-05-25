import { env } from "@/env/client";
import { TriplitClient } from "@triplit/client";
import { schema } from "./schema";

export const triplitClient = new TriplitClient({
  schema,
  serverUrl: env.NEXT_PUBLIC_TRIPLIT_SERVER_URL,
  token: env.NEXT_PUBLIC_TRIPLIT_ANON_TOKEN,
});
