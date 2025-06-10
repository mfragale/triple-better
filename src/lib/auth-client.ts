import { stripeClient } from "@better-auth/stripe/client";
import {
  adminClient,
  genericOAuthClient,
  inferAdditionalFields,
  multiSessionClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin, professor, user } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    genericOAuthClient(),
    inferAdditionalFields({
      user: {
        church: {
          type: "string",
          required: false,
        },
        birthdate: {
          type: "date",
          required: false,
        },
      },
    }),
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
  ],
});
export const { signIn, signUp, signOut } = createAuthClient();
