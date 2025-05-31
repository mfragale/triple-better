import { useConnectionStatus } from "@triplit/react";
import { useMemo } from "react";
import { triplit } from "../../triplit/client";

export function useTriplitToken() {
  const connectionStatus = useConnectionStatus(triplit);

  const payload = useMemo(
    () =>
      triplit.token
        ? (decodeJWT(triplit.token) as Record<string, unknown> & {
            exp: number;
            iat: number;
            sub?: string;
          })
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [connectionStatus]
  );

  return { token: payload && triplit.token, payload };
}

function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => {
          return `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}
