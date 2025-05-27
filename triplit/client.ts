import { env } from "@/env/client";
import { TriplitClient } from "@triplit/client";
import { schema } from "./schema";

export const triplit = new TriplitClient({
  schema,
  serverUrl: env.NEXT_PUBLIC_TRIPLIT_DB_URL,
  autoConnect: false,
});
