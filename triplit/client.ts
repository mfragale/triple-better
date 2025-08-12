import { env } from "@/env/client";
import { isServer } from "@/lib/utils";
import { TriplitClient } from "@triplit/client";
import { schema } from "./schema";

export const triplit = new TriplitClient({
  schema,
  serverUrl: env.NEXT_PUBLIC_TRIPLIT_DB_URL,
  storage: {
    // name: "triple-better",
    type: isServer ? "memory" : "memory",
  },
  autoConnect: false,
  logLevel: "debug",
});
