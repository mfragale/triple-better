import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    TRIPLIT_DB_URL: z.string().url(),
    TRIPLIT_ANON_TOKEN: z.string(),
    TRIPLIT_SERVICE_TOKEN: z.string(),
    PCO_CLIENT_ID: z.string().min(1),
    PCO_SECRET: z.string().min(1),
  },
  onValidationError: (error) => {
    console.error("Error validating environment variables:", error);
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  // This is the only place in our codebase where we should access `process.env`.
  // The commented line below tells ESLint to allow the `process.env` usage in this file.
  //   eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});
