import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
} from "better-auth/plugins/organization/access";

// [resource]: ["action", "action", "action"]
const statement = {
  ...defaultStatements,
  todo: ["create", "read", "update", "delete"],
  userDashboard: ["create", "read", "update", "delete"],
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
  ],
} as const;

export const ac = createAccessControl(statement);

// For each role...
// [resource]: ["action", "action", "action"]
export const user = ac.newRole({
  todo: ["create", "read"],
  userDashboard: ["read"],
});

export const admin = ac.newRole({
  todo: ["create", "read", "update", "delete"],
  userDashboard: ["create", "read", "update", "delete"],
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
  ],
  ...adminAc.statements,
});
