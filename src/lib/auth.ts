import { sendEmail } from "@/actions/send-emails/route";
import { env } from "@/env/server";
import { ac, admin, professor, user } from "@/lib/permissions";
import { triplitAdapter } from "@daveyplate/better-auth-triplit";
import { betterAuth } from "better-auth";
import { admin as adminPlugin, genericOAuth } from "better-auth/plugins";
import { httpClient } from "../../triplit/http-client";

export const auth = betterAuth({
  database: triplitAdapter({
    httpClient,
    debugLogs: false,
  }),
  user: {
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
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        heading: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
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
  ],
});

export type Session = typeof auth.$Infer.Session;
