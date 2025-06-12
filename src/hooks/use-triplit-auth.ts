import type { AnyAuthClient } from "@/types/any-auth-client";
import type { TriplitClient } from "@triplit/client";
import { useEffect } from "react";
import {
  type InitTriplitAuthOptions,
  initTriplitAuth,
} from "./init-triplit-auth";

export function useTriplitAuth(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triplit: TriplitClient<any>,
  authClient: AnyAuthClient,
  options?: InitTriplitAuthOptions
) {
  useEffect(
    () => initTriplitAuth(triplit, authClient, options),
    [triplit, authClient, options]
  );
}
