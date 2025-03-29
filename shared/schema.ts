import { pgTable, text, serial, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model - Match actual database structure
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password_hash").notNull(), // Column name in DB is password_hash
  email: text("email").notNull().unique(),
  // fullName column doesn't exist in the database table
  createdAt: timestamp("created_at").defaultNow(),
});

// Financial Profile model
export const financialProfiles = pgTable("financial_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  monthlyIncome: numeric("monthly_income"),
  housingExpense: numeric("housing_expense"),
  transportExpense: numeric("transport_expense"),
  foodExpense: numeric("food_expense"),
  otherExpenses: numeric("other_expenses"),
  savingsGoal: numeric("savings_goal"),
  retirementGoal: numeric("retirement_goal"),
  riskTolerance: text("risk_tolerance"), // 'low', 'medium', 'high'
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Chat message model
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  message: text("message").notNull(),
  isUserMessage: integer("is_user_message").notNull(), // 1 for user, 0 for system
  timestamp: timestamp("timestamp").defaultNow(),
});

// Financial Goal model
export const financialGoals = pgTable("financial_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  targetAmount: numeric("target_amount").notNull(),
  currentAmount: numeric("current_amount").notNull(),
  deadline: timestamp("deadline"),
  category: text("category").notNull(), // 'emergency', 'retirement', 'home', 'education', etc.
  createdAt: timestamp("created_at").defaultNow(),
});

// Define insert schemas using drizzle-zod
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertFinancialProfileSchema = createInsertSchema(financialProfiles).omit({
  id: true,
  updatedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

export const insertFinancialGoalSchema = createInsertSchema(financialGoals).omit({
  id: true,
  createdAt: true,
});

// Define types using z.infer and table.$inferSelect
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFinancialProfile = z.infer<typeof insertFinancialProfileSchema>;
export type FinancialProfile = typeof financialProfiles.$inferSelect;

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export type InsertFinancialGoal = z.infer<typeof insertFinancialGoalSchema>;
export type FinancialGoal = typeof financialGoals.$inferSelect;
