import { z } from 'zod';

// Base gift schema for common fields
const giftBaseSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.string().optional(), // Using string for price to handle currency formatting
  importanceLevel: z.enum(['HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
});

// Schema for creating a new gift
export const createGiftSchema = giftBaseSchema;

// Schema for updating an existing gift
export const updateGiftSchema = giftBaseSchema.partial();

// Schema for getting a gift by ID
export const getGiftByIdSchema = z.object({
  id: z.number(),
});

// Schema for deleting a gift
export const deleteGiftSchema = z.object({
  id: z.number(),
});

// Schema for getting all gifts with optional sorting
export const getGiftsSchema = z.object({
  sortBy: z
    .enum(['productName', 'price', 'importanceLevel', 'createdAt'])
    .optional()
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Schema for searching gifts
export const searchGiftsSchema = z.object({
  searchTerm: z.string().min(1, 'Search term is required'),
}); // Define the update input type
export const updateInputSchema = updateGiftSchema.extend({
  id: z.number(),
});
export type UpdateInput = z.infer<typeof updateInputSchema>;
