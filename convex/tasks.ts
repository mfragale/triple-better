// import { query } from "./_generated/server"; // Not allowed by eslint-setup due to not being a custom query
import { v } from "convex/values";
import { mutationWithRLS, queryWithRLS } from "./rls";

export const createTask = mutationWithRLS({
  args: {
    text: v.string(),
    userId: v.id("users"),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const { text, userId, order } = args;
    await ctx.db.insert("tasks", {
      text,
      userId,
      isCompleted: false,
      order,
      updatedAt: new Date().toISOString(),
    });
  },
});

// export const getTasks = query({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.db
//       .query("tasks")
//       .withIndex("by_order")
//       .order("asc")
//       .collect();
//   },
// });

export const getOnlyCurrentUserTasks = queryWithRLS({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});

export const updateTaskText = mutationWithRLS({
  args: {
    id: v.id("tasks"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, text } = args;
    await ctx.db.patch(id, {
      text,
      updatedAt: new Date().toISOString(),
    });
  },
});

export const updateTaskIsCompleted = mutationWithRLS({
  args: {
    id: v.id("tasks"),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, isCompleted } = args;
    await ctx.db.patch(id, {
      isCompleted,
      updatedAt: new Date().toISOString(),
    });
  },
});

export const updateTaskOrder = mutationWithRLS({
  args: {
    id: v.id("tasks"),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, order } = args;
    await ctx.db.patch(id, {
      order,
      updatedAt: new Date().toISOString(),
    });
  },
});

export const deleteTask = mutationWithRLS({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});
