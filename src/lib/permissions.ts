import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
} from "better-auth/plugins/organization/access";

// [resource]: ["action", "action", "action"]
// This defines the actions that each resource can have
const statement = {
  ...defaultStatements,
  todo: ["create", "read", "update", "delete"],
  userDashboard: ["create", "read", "update", "delete"],

  // User here is defined as a resource, not a role
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
// This defines the actions that each role can perform upon each resource

// User here is the actual role, not the resource
export const user = ac.newRole({
  todo: ["read"],
  userDashboard: ["read"],
});

export const admin = ac.newRole({
  todo: ["create", "read", "update", "delete"],
  userDashboard: ["create", "read", "update", "delete"],

  // User here is defined as a resource, not a role
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
