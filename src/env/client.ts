import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_TRIPLIT_DB_URL: z.string().min(1).url(),
    NEXT_PUBLIC_TRIPLIT_ANON_TOKEN: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_SERVER_URL: z.string().min(1).url(),
  },
  experimental__runtimeEnv: {
    // This is the only place in our codebase where we should access `process.env`.
    // The commented line below tells ESLint to allow the `process.env` usage in this file.
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_TRIPLIT_DB_URL: process.env.NEXT_PUBLIC_TRIPLIT_DB_URL,
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_TRIPLIT_ANON_TOKEN: process.env.NEXT_PUBLIC_TRIPLIT_ANON_TOKEN,
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      //   eslint-disable-next-line n/no-process-env
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
});
