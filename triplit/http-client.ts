import { env as clientEnv } from "@/env/client";
import { env } from "@/env/server";
import { HttpClient } from "@triplit/client";
import { schema } from "./schema";

export const httpClient = new HttpClient({
  schema,
  serverUrl: clientEnv.NEXT_PUBLIC_TRIPLIT_DB_URL,
  token: env.TRIPLIT_SERVICE_TOKEN,
});
