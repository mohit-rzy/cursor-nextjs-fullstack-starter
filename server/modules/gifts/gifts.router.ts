import { router } from '../../core/router';
import { privateProcedure } from '../../core/router/procedures/private-procedure';
import { giftsService } from './gifts.service';
import {
  createGiftSchema,
  deleteGiftSchema,
  getGiftByIdSchema,
  getGiftsSchema,
  searchGiftsSchema,
  updateInputSchema,
} from './gifts.schema';
import { Context } from '../../core/router/context';
import { z } from 'zod';

export const giftsRouter = router({
  // Create a new gift
  create: privateProcedure
    .input(createGiftSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId!;
      return giftsService.createGift({
        ...input,
        userId,
      });
    }),

  // Get a gift by ID
  getById: privateProcedure
    .input(getGiftByIdSchema)
    .query(
      async ({
        ctx,
        input,
      }: {
        ctx: Context;
        input: z.infer<typeof getGiftByIdSchema>;
      }) => {
        const userId = ctx.auth.userId!;
        return giftsService.getGiftById(input.id, userId);
      }
    ),

  // Get all gifts for the current user
  getAll: privateProcedure
    .input(getGiftsSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.userId!;
      return giftsService.getGiftsByUserId(
        userId,
        input.sortBy,
        input.sortOrder
      );
    }),

  // Update a gift
  update: privateProcedure
    .input(updateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId!;
      const { id, ...data } = input;
      return giftsService.updateGift(id, userId, data);
    }),

  // Delete a gift
  delete: privateProcedure
    .input(deleteGiftSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId!;
      return giftsService.deleteGift(input.id, userId);
    }),

  // Search gifts
  search: privateProcedure
    .input(searchGiftsSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.userId!;
      return giftsService.searchGifts(userId, input.searchTerm);
    }),
});
