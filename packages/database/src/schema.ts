import { pgTable, text, timestamp, boolean, uuid, jsonb, real, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('USER'), // 'USER' or 'ADMIN'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const problems = pgTable('problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  difficulty: text('difficulty').notNull(), // 'EASY', 'MEDIUM', 'HARD'
  constraints: jsonb('constraints'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const testCases = pgTable('test_cases', {
  id: uuid('id').primaryKey().defaultRandom(),
  problemId: uuid('problem_id').references(() => problems.id).notNull(),
  input: text('input').notNull(),
  expectedOutput: text('expected_output').notNull(),
  isHidden: boolean('is_hidden').default(true).notNull(),
});

export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  problemId: uuid('problem_id').references(() => problems.id).notNull(),
  language: text('language').notNull(),
  code: text('code').notNull(),
  status: text('status').notNull().default('QUEUED'), // 'QUEUED', 'COMPILING', 'RUNNING', 'ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR', 'SYSTEM_ERROR', 'CANCELLED'
  executionTimeMs: real('execution_time_ms'),
  memoryUsedKb: integer('memory_used_kb'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
