import { authClient } from "@/lib/auth-client";
import { useQueryOne } from "@triplit/react";
import { triplit } from "~/triplit/client";

export function useSession() {
  const result = authClient.useSession();
  const sessionData = result?.data;

  const { result: user } = useQueryOne(
    triplit,
    triplit.query("users").Where("id", "=", sessionData?.user.id),
    {
      enabled: !!sessionData,
    }
  );

  if (user && sessionData) {
    sessionData.user = user;
  }

  return result;
}
