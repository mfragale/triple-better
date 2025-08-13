import { stripeClient } from "@better-auth/stripe/client";
import {
  adminClient,
  genericOAuthClient,
  inferAdditionalFields,
  multiSessionClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { ac, admin, professor, user } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    genericOAuthClient(),
    adminClient({
      ac: ac,
      roles: {
        admin,
        user,
        professor,
      },
    }),
    multiSessionClient(),
    stripeClient({
      subscription: true, //if you want to enable subscription management
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});
export const { signIn, signUp, signOut } = createAuthClient();
