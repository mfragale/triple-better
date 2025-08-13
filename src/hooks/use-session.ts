import { authClient } from "@/lib/auth-client";
// import { useSession as usePersistentSession } from "@daveyplate/better-auth-persistent";
import { useQueryOne } from "@triplit/react";
import { triplit } from "~/triplit/client";

export function useSession() {
  // const result = usePersistentSession(authClient);
  const result = authClient.useSession();
  const sessionData = result?.data;

  const { result: user } = useQueryOne(
    triplit,
    triplit.query("users").Where("id", "=", sessionData?.user.id),
    {
      enabled: !!sessionData,
    }
  );

  // console.log("user", user);

  if (user && sessionData) {
    sessionData.user = user;
  }

  return result;
}
