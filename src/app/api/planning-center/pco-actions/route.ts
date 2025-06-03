import { getLocale, getTranslations } from "next-intl/server";

import { getAccount } from "@/actions/db/user";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const t = await getTranslations("ApiPcoAvatarSync");
  const locale = getLocale();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("Session in route: ", session);

  // // const code = request.nextUrl.searchParams.get("code");

  if (!session) {
    return new Response("No user", { status: 500 });
  }

  // Extract user ID from the session
  const userId = session.user.id;

  console.log("userId in route: ", userId);

  // Get PCO account details from the database
  const userAccount = await getAccount(userId, "planning-center");

  console.log("userAccount in route: ", userAccount);

  if (!userAccount || !userAccount.accessToken) {
    return new Response(t("noPcoAccount"), { status: 404 });
  }

  // console.log("User Account: ", userAccount);

  // Extract PCO access token and account ID
  const pcoAccessToken = userAccount.accessToken;

  // console.log("pcoAccessToken: ", pcoAccessToken);

  const pcoAccountId = userAccount.accountId;

  // console.log("pcoAccountId: ", pcoAccountId);

  const response = await fetch(
    `https://api.planningcenteronline.com/people/v2/people/${pcoAccountId}`,
    {
      headers: {
        Authorization: `Bearer ${pcoAccessToken}`,
        Accept: "application/json",
      },
    }
  );

  const profile = await response.json();

  console.log("Profile: ", profile);

  await auth.api.updateUser({
    body: {
      image: profile.data.attributes.avatar,
      name: profile.data.attributes.name,
      // email: profile.data.attributes.login_identifier,
      // emailVerified: true,
    },
    headers: await headers(), // optional but would be useful to get the user IP, user agent, etc.
  });

  // Fetch existing tags
  const existingTagsResponse = await fetch(
    `https://api.planningcenteronline.com/services/v2/people/${pcoAccountId}/tags`,
    {
      headers: {
        Authorization: `Bearer ${pcoAccessToken}`,
        Accept: "application/json",
      },
    }
  );

  const existingTagsData = await existingTagsResponse.json();

  interface Tag {
    type: string;
    id: string;
  }

  // Prepare tag data array with existing tags
  const tagData = existingTagsData.data.map((tag: { id: string }) => ({
    type: "Tag",
    id: tag.id,
  }));

  // Add the new tag if it's not already present
  const newTagId = "12619567";
  if (!tagData.some((tag: Tag) => tag.id === newTagId)) {
    tagData.push({
      type: "Tag",
      id: newTagId,
    });
  }

  const tagResponse = await fetch(
    `https://api.planningcenteronline.com/services/v2/people/${pcoAccountId}/assign_tags`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pcoAccessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "TagAssignment",
          attributes: {},
          relationships: {
            tags: {
              data: tagData,
            },
          },
        },
      }),
    }
  );

  if (!tagResponse.ok) {
    console.error("Failed to assign tag:", await tagResponse.json());
  }

  await new Promise((res) => setTimeout(res, 100));

  redirect({ href: "/dashboard/settings", locale: await locale });
}
