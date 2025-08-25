import { auth } from "./auth";

export async function can(
  user: { id: string; role: string | null | undefined },
  action: string,
  resource: string
) {
  // const { data, error } = await authClient.admin.hasPermission({
  //   userId: user.id,
  //   permission: { [resource]: [action] },
  // });

  // if (error) {
  //   throw new Error(error.message);
  // }

  // if (!data || !data.success) {
  //   throw new Error("You do not have permission to access this resource");
  // }

  // return true;

  const { success, error } = await auth.api.userHasPermission({
    body: {
      userId: user.id,
      role: user.role as "admin" | "user",
      permission: { [resource]: [action] },
    },
  });

  if (error) {
    throw new Error(error);
  }

  if (!success) {
    throw new Error("You do not have permission to access this resource");
  }

  return true;
}
