// import { query } from "./_generated/server"; // Not allowed by eslint-setup due to not being a custom query
import { queryWithRLS } from "./rls";

// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.db.query("tasks").collect();
//   },
// });

export const getOnlyCurrentUserTasks = queryWithRLS({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});
