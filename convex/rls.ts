// https://stack.convex.dev/row-level-security
// https://stack.convex.dev/authorization
// https://stack.convex.dev/eslint-setup
// https://stack.convex.dev/crud-and-rest

import {
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import {
  Rules,
  wrapDatabaseReader,
  wrapDatabaseWriter,
} from "convex-helpers/server/rowLevelSecurity";
import { DataModel } from "./_generated/dataModel";
/* eslint-disable no-restricted-imports */
import { mutation, query, QueryCtx } from "./_generated/server";

async function rlsRules(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  return {
    tasks: {
      // db.get or db.query
      read: async (
        {
          // auth
        },
        task
      ) => {
        if (identity === null) {
          // return task.isCompleted; // Returns only completed tasks
          return false; // Returns no tasks
        }
        return task.userId === identity.tokenIdentifier.split("|")[1]; // Returns only tasks for the current user
      },

      // db.insert
      insert: async (
        {
          // auth
        },
        task
      ) => {
        if (identity === null) {
          return false;
        }
        return task.userId === identity.tokenIdentifier.split("|")[1];
      },

      // db.patch, db.replace, or db.delete
      modify: async (
        {
          // auth
        },
        task
      ) => {
        if (identity === null) {
          return false;
        }
        return task.userId === identity.tokenIdentifier.split("|")[1];
      },
    },
  } satisfies Rules<QueryCtx, DataModel>;
}

export const queryWithRLS = customQuery(
  query,
  customCtx(async (ctx) => ({
    db: wrapDatabaseReader(ctx, ctx.db, await rlsRules(ctx)),
  }))
);

export const mutationWithRLS = customMutation(
  mutation,
  customCtx(async (ctx) => ({
    db: wrapDatabaseWriter(ctx, ctx.db, await rlsRules(ctx)),
  }))
);
