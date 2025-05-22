import { triplitAdapter } from "@daveyplate/better-auth-triplit";
import { HttpClient } from "@triplit/client";
import { betterAuth } from "better-auth";
import { schema } from "../../triplit/schema";

const httpClient = new HttpClient({
  schema,
  serverUrl: process.env.NEXT_PUBLIC_TRIPLIT_SERVER_URL,
  token: process.env.NEXT_PUBLIC_TRIPLIT_TOKEN,
});

export const auth = betterAuth({
  database: triplitAdapter({
    httpClient,
    debugLogs: false, // Optional: enable for debugging
    usePlural: true, // Optional: set to false if your schema uses singular names
  }),
  emailAndPassword: {
    enabled: true,
  },
});
