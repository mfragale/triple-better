import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
} from "better-auth/plugins/organization/access";

// [resource]: ["action", "action", "action"]
const statement = {
  ...defaultStatements,
  adminDashboard: ["create", "update", "delete", "read", "manage"],
  dashboard: ["create", "update", "delete", "read", "manage"],
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
  dashboard: ["manage", "read"],
  invitation: ["create", "cancel"],
});

export const admin = ac.newRole({
  dashboard: ["create", "update", "delete", "read", "manage"],
  adminDashboard: ["create", "update", "delete", "read", "manage"],
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

export const professor = ac.newRole({
  dashboard: ["create", "update", "delete"],
});
