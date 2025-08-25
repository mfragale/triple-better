import { auth } from "./auth";

export async function can(
  user: { id: string | undefined; role: string | null | undefined },
  action: string,
  resource: string
) {
  // Server-side
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
