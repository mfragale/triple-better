import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_SERVER_URL: z.url(),
    NEXT_PUBLIC_CONVEX_URL: z.string().min(1),
    NEXT_PUBLIC_CONVEX_SITE_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    // This is the only place in our codebase where we should access `process.env`.
    // The commented line below tells ESLint to allow the `process.env` usage in this file.
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      //   eslint-disable-next-line n/no-process-env
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
  },
});
