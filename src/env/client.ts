import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_TRIPLIT_SERVER_URL: z.string().url(),
    NEXT_PUBLIC_TRIPLIT_TOKEN: z.string(),
  },
  experimental__runtimeEnv: {
    // This is the only place in our codebase where we should access `process.env`.
    // The commented line below tells ESLint to allow the `process.env` usage in this file.
    //   eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_TRIPLIT_SERVER_URL: process.env.NEXT_PUBLIC_TRIPLIT_SERVER_URL,
    NEXT_PUBLIC_TRIPLIT_TOKEN: process.env.NEXT_PUBLIC_TRIPLIT_TOKEN,
  },
});
