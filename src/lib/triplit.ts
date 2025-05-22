import { TriplitClient } from "@triplit/client";
import { schema } from "../../triplit/schema";

export const triplitClient = new TriplitClient({
  schema,
  serverUrl: process.env.NEXT_PUBLIC_TRIPLIT_SERVER_URL,
  token: process.env.NEXT_PUBLIC_TRIPLIT_TOKEN,
});
