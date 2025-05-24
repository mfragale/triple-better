"use client";

import { useEffect, useState } from "react";

import { PCOIncludedItem, RespondsToUser } from "@/types";

interface RespondsToProps {
  pcoId: string;
  pcoAccessToken: string;
  children: (respondsToUser: RespondsToUser) => React.ReactNode;
}

export function RespondsTo({
  pcoId,
  pcoAccessToken,
  children,
}: RespondsToProps) {
  const [respondsToUser, setRespondsToUser] = useState<RespondsToUser>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!pcoAccessToken || !pcoId) return;

      // console.log("fetching user data", pcoAccessToken);

      try {
        const response = await fetch(
          `https://api.planningcenteronline.com/people/v2/people/${pcoId}?include=emails,phone_numbers`,
          {
            headers: {
              Authorization: `Bearer ${pcoAccessToken}`,
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();

        // Find primary email
        const primaryEmail = data.included.find(
          (item: PCOIncludedItem) =>
            item.type === "Email" && item.attributes.primary
        )?.attributes.address;

        // Find primary phone number
        const primaryPhone = data.included.find(
          (item: PCOIncludedItem) =>
            item.type === "PhoneNumber" && item.attributes.primary
        )?.attributes.international;

        // Clean phone number by removing spaces, dashes and + sign
        const cleanPhoneNumber = primaryPhone?.replace(/[\s+-]/g, "") || "";

        setRespondsToUser({
          avatar: data.data.attributes.avatar,
          email: primaryEmail || "",
          phoneNumber: primaryPhone || "",
          cleanPhoneNumber: cleanPhoneNumber,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchUserData();
  }, [pcoId, pcoAccessToken]);

  if (!pcoId || !pcoAccessToken) return null;

  return children(respondsToUser);
}
