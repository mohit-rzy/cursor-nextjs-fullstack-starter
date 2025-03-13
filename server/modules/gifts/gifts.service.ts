import { TRPCError } from '@trpc/server';
import { giftsRepository } from './gifts.repository';
import type { Gift, NewGift } from './gifts.db';
import { sleep } from '../../core/utils/sleep';

export const giftsService = {
  /**
   * Create a new gift
   */
  async createGift(
    gift: Omit<NewGift, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Gift> {
    return giftsRepository.createGift(gift as NewGift);
  },

  /**
   * Get a gift by ID
   */
  async getGiftById(id: number, userId: string): Promise<Gift> {
    const gift = await giftsRepository.getGiftById(id, userId);
    if (!gift) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Gift not found',
      });
    }
    return gift;
  },

  /**
   * Get all gifts for a user
   */
  async getGiftsByUserId(
    userId: string,
    sortBy: keyof Gift = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<Gift[]> {
    // Add artificial delay of 1.5 seconds
    await sleep(1500);
    return giftsRepository.getGiftsByUserId(userId, sortBy, sortOrder);
  },

  /**
   * Update a gift
   */
  async updateGift(
    id: number,
    userId: string,
    gift: Partial<NewGift>
  ): Promise<Gift> {
    const updatedGift = await giftsRepository.updateGift(id, userId, gift);
    if (!updatedGift) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Gift not found',
      });
    }
    return updatedGift;
  },

  /**
   * Delete a gift
   */
  async deleteGift(id: number, userId: string): Promise<boolean> {
    const deleted = await giftsRepository.deleteGift(id, userId);
    if (!deleted) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Gift not found',
      });
    }
    return true;
  },

  /**
   * Search gifts by name or description
   */
  async searchGifts(userId: string, searchTerm: string): Promise<Gift[]> {
    // Add artificial delay of 1.5 seconds
    await sleep(1500);
    return giftsRepository.searchGifts(userId, searchTerm);
  },
};
