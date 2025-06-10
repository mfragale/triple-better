import {
  sendChangeEmailVerificationEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "@/actions/send-emails/route";
import { env } from "@/env/server";
import { ac, admin, professor, user } from "@/lib/permissions";
import { stripe } from "@better-auth/stripe";
import { triplitAdapter } from "@daveyplate/better-auth-triplit";
import { betterAuth } from "better-auth";
import {
  admin as adminPlugin,
  genericOAuth,
  multiSession,
} from "better-auth/plugins";
import { httpClient } from "../../triplit/http-client";

import Stripe from "stripe";

const stripeClient = new Stripe(env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export const auth = betterAuth({
  database: triplitAdapter({
    httpClient,
    debugLogs: false,
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }) => {
        await sendChangeEmailVerificationEmail({
          newEmail: newEmail,
          url: url,
        });
      },
    },
    additionalFields: {
      church: {
        type: "string",
        required: false,
      },
      birthdate: {
        type: "date",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({
        user: user,
        url: url,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      await sendVerificationEmail({
        user: user,
        token: token,
      });
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "planning-center",
          authentication: "basic",
          clientId: env.PCO_CLIENT_ID,
          clientSecret: env.PCO_SECRET,
          authorizationUrl:
            "https://api.planningcenteronline.com/oauth/authorize",
          scopes: ["people", "services"],
          tokenUrl: "https://api.planningcenteronline.com/oauth/token",
          userInfoUrl: "https://api.planningcenteronline.com/people/v2/me",
          redirectURI: `${env.BETTER_AUTH_URL}/api/auth/oauth2/callback/planning-center`,
          overrideUserInfo: true, // As far as I can tell, this is just mearly formality for the BetterAuth plugin.  The real sync occurs in src/app/api/planning-center/pco-actions/route.ts
          accessType: "oauth2",
          getUserInfo: async (tokens) => {
            const fetchUserInfoFromCustomProvider = await fetch(
              "https://api.planningcenteronline.com/people/v2/me",
              {
                headers: {
                  Authorization: `Bearer ${tokens.accessToken}`,
                  Accept: "application/json",
                },
              }
            );
            const profile = await fetchUserInfoFromCustomProvider.json();

            console.log("Profile: ", profile);

            return {
              // As far as I can tell, this is just mearly formality for the BetterAuth plugin.
              // The real sync occurs in src/app/api/planning-center/pco-actions/route.ts
              id: profile.data.id,
              name: profile.data.attributes.name,
              email: profile.data.attributes.login_identifier,
              image: profile.data.attributes.avatar,
              emailVerified: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          },
        },
      ],
    }),
    adminPlugin({
      ac: ac,
      roles: {
        admin,
        user,
        professor,
      },
    }),
    multiSession(),
    stripe({
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: false,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "basic", // the name of the plan, it'll be automatically lower cased when stored in the database
            priceId: "price_1RWIojGgkSoYSC7U3XgCp2aQ", // the price id from stripe
          },
          {
            name: "pro",
            priceId: "price_1RWIxoGgkSoYSC7UupvJHg08",
            freeTrial: {
              days: 14,
            },
          },
        ],
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type Account = {
  accountId: string;
  createdAt: Date;
  id: string;
  provider: string;
  scopes: Array<string>;
  updatedAt: Date;
};
