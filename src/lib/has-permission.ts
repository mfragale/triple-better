import { authClient } from "./auth-client";

export function hasPermission(
  user: { id: string; role: string },
  action: string,
  resource: string
) {
  return authClient.admin.checkRolePermission({
    permission: {
      [resource]: [action],
    },
    role: user.role as "admin" | "user" | "professor",
  });
}
