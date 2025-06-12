import { env } from "@/env/client";
import { AnyAuthClient } from "@/types/any-auth-client";
import { subscribePersistSession } from "@daveyplate/better-auth-persistent";
import type { SessionError, TriplitClient } from "@triplit/client";
import type { Session, User } from "better-auth";

type SessionData = {
  session: Session;
  user: User;
};

export type InitTriplitAuthOptions = {
  anonToken?: string;
  /** @default true */
  persistent?: boolean;
  onSessionError?: (error: SessionError) => void;
};

export function initTriplitAuth(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triplit: TriplitClient<any>,
  authClient: AnyAuthClient,
  { anonToken, persistent = true, onSessionError }: InitTriplitAuthOptions = {}
) {
  const unbindPersistSession = persistent
    ? subscribePersistSession(authClient)
    : undefined;

  const startSession = async (sessionData: SessionData | null) => {
    console.log("startSession");
    const token =
      sessionData?.session.token ||
      anonToken ||
      env.NEXT_PUBLIC_TRIPLIT_ANON_TOKEN;

    if (!token) return;
    if (triplit.token === token) return;

    // Update session token if it's the same user and role
    if (
      sessionData &&
      !triplit.awaitReady &&
      triplit.vars.$token.sub === sessionData.user.id &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      triplit.vars.$token.role === (sessionData.user as any).role
    ) {
      try {
        await triplit.updateSessionToken(token);
      } catch (error) {
        console.error(error);
      }
      return;
    }

    // Hack to fix switching session showing loaders correctly
    // if (triplit.token) {
    //     if (triplit.connectionStatus === "OPEN") {
    //         await triplit.endSession()
    //         await new Promise((resolve) => setTimeout(resolve, 100))
    //     }
    // }

    // Clear local DB when we sign out
    if (!sessionData) {
      try {
        await triplit.clear();
      } catch (error) {
        console.error(error);
      }
    }

    try {
      console.log("triplit.startSession");
      await triplit.startSession(token);
    } catch (error) {
      console.error(error);
    }
  };

  const unbindOnSessionChange = authClient.$store.atoms.session.subscribe(
    (result) => !result.isPending && startSession(result.data)
  );

  const unbindOnSessionError = triplit.onSessionError((error) => {
    console.error(error);
    onSessionError?.(error);
  });

  const unbindOnFailureToSyncWrites = triplit.onFailureToSyncWrites((error) => {
    console.error(error);
    triplit.clearPendingChangesAll();
  });

  return () => {
    unbindPersistSession?.();
    unbindOnSessionChange();
    unbindOnSessionError();
    unbindOnFailureToSyncWrites();
  };
}
