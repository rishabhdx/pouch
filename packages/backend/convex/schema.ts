import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { tables } from "./betterAuth/schema";

export default defineSchema({
  ...tables,

  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    userId: v.string()
  }).index("userId", ["userId"])
});
