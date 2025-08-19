import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Fields are optional
  }),
  tasks: defineTable({
    userId: v.optional(v.id("users")),
    text: v.string(),
    isCompleted: v.boolean(),
    order: v.number(),
    updatedAt: v.string(),
  }),
});
