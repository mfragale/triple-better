import { env as clientEnv } from "@/env/client";
import { env } from "@/env/server";
import { triplitAdapter } from "@daveyplate/better-auth-triplit";
import { HttpClient } from "@triplit/client";
import { betterAuth } from "better-auth";
import { genericOAuth, jwt } from "better-auth/plugins";
import { schema } from "../../triplit/schema";

const httpClient = new HttpClient({
  schema,
  serverUrl: clientEnv.NEXT_PUBLIC_TRIPLIT_SERVER_URL,
  token: clientEnv.NEXT_PUBLIC_TRIPLIT_TOKEN,
});

export const auth = betterAuth({
  database: triplitAdapter({
    httpClient,
    debugLogs: true, // Optional: enable for debugging
    usePlural: true, // Optional: set to false if your schema uses singular names
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    jwt(),
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
  ],
});

export type Session = typeof auth.$Infer.Session;
