import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Fields are optional
    image: v.optional(v.string()),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.string()),
  }),
  tasks: defineTable({
    userId: v.optional(v.id("users")),
    text: v.string(),
    isCompleted: v.boolean(),
    order: v.number(),
    updatedAt: v.string(),
  }).index("by_order", ["order"]),
});
