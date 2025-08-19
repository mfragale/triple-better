import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Fields are optional
  }),
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
    userId: v.optional(v.id("users")),
  }),
});
