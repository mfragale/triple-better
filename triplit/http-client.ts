import { env } from "@/env/server";
import { HttpClient } from "@triplit/client";
import { schema } from "./schema";

export const httpClient = new HttpClient({
  schema,
  serverUrl: env.TRIPLIT_DB_URL,
  token: env.TRIPLIT_SERVICE_TOKEN,
});
