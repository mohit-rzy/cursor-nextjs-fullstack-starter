import {
  pgTable,
  serial,
  text,
  decimal,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Create an enum for importance levels
export const importanceLevelEnum = pgEnum('importance_level', [
  'HIGH',
  'MEDIUM',
  'LOW',
]);

// Create the gifts table schema
export const gifts = pgTable('gifts', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // BetterAuth user ID
  productName: text('product_name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),
  importanceLevel: importanceLevelEnum('importance_level')
    .notNull()
    .default('MEDIUM'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Create Zod schemas for insert and select operations
export const insertGiftSchema = createInsertSchema(gifts);
export const selectGiftSchema = createSelectSchema(gifts);

// Export types
export type Gift = z.infer<typeof selectGiftSchema>;
export type NewGift = z.infer<typeof insertGiftSchema>;
