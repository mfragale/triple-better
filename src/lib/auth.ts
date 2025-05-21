import { TriplitClient } from "@triplit/client";
import { betterAuth } from "better-auth";
import { schema } from "../../triplit/schema";

const triplitClient = new TriplitClient({
  schema,
  serverUrl: process.env.NEXT_PUBLIC_TRIPLIT_SERVER_URL,
  token: process.env.NEXT_PUBLIC_TRIPLIT_TOKEN,
});

export const auth = betterAuth({
  database: triplitClient,
  emailAndPassword: {
    enabled: true,
  },
});
