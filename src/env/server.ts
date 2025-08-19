import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
    EMAIL_VERIFICATION_CALLBACK_URL: z.url(),
    PCO_CLIENT_ID: z.string().min(1),
    PCO_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM: z.email(),
    APP_NAME: z.string().min(1),
    APP_DESCRIPTION: z.string().min(1),
    DEPLOYED_URL: z.url(),
    UPLOADTHING_TOKEN: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    CONVEX_DEPLOYMENT: z.string().min(1),
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
