import { useQuery } from "@triplit/react";
import { triplit } from "~/triplit/client";
import { useToken } from "./use-token";

export function useTodos() {
  // useAuthenticate is a wrapper for useSession that redirects to sign in
  // const { data: sessionData } = useSession();
  // console.log("sessionData", sessionData);
  // console.log("sessionError", sessionError);

  const { token } = useToken(triplit);
  // const userId = sessionData?.user?.id;
  const todosQuery = triplit.query("todos").Order("order", "ASC");
  // .Where("userId", "=", userId);

  const {
    results: todos,
    error,
    fetching,
  } = useQuery(triplit, todosQuery, {
    enabled: !!token,
  });

  const isPending = !token || fetching;

  return { todos, error, isPending };
}
