import { authClient } from "./auth-client";

export async function canClient(
  user: { id: string | undefined; role: string | null | undefined },
  action: string,
  resource: string
) {
  // Client-side
  const { data, error } = await authClient.admin.hasPermission({
    userId: user.id,
    permission: { [resource]: [action] },
  });

  if (error) {
    throw new Error(error.message);
  }
  // console.log("data", data);

  return data?.success ?? false;
}
