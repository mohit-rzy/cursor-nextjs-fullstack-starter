import { db } from '../../core/db';
import { desc, asc, sql } from 'drizzle-orm';
import { gifts, type Gift, type NewGift } from './gifts.db';

export const giftsRepository = {
  /**
   * Create a new gift
   */
  async createGift(gift: NewGift): Promise<Gift> {
    const [createdGift] = await db.insert(gifts).values(gift).returning();
    return createdGift;
  },

  /**
   * Get a gift by ID
   */
  async getGiftById(id: number, userId: string): Promise<Gift | undefined> {
    const [gift] = await db
      .select()
      .from(gifts)
      .where(sql`${gifts.id} = ${id} AND ${gifts.userId} = ${userId}`);

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
    const query = db
      .select()
      .from(gifts)
      .where(sql`${gifts.userId} = ${userId}`);

    // Apply sorting
    const result = await query.orderBy(
      sortOrder === 'asc' ? asc(gifts[sortBy]) : desc(gifts[sortBy])
    );
    return result;
  },

  /**
   * Update a gift
   */
  async updateGift(
    id: number,
    userId: string,
    gift: Partial<NewGift>
  ): Promise<Gift | undefined> {
    const [updatedGift] = await db
      .update(gifts)
      .set({ ...gift, updatedAt: new Date() })
      .where(sql`${gifts.id} = ${id} AND ${gifts.userId} = ${userId}`)
      .returning();

    return updatedGift;
  },

  /**
   * Delete a gift
   */
  async deleteGift(id: number, userId: string): Promise<boolean> {
    const [deletedGift] = await db
      .delete(gifts)
      .where(sql`${gifts.id} = ${id} AND ${gifts.userId} = ${userId}`)
      .returning();

    return !!deletedGift;
  },

  /**
   * Search gifts by name or description
   */
  async searchGifts(userId: string, searchTerm: string): Promise<Gift[]> {
    const result = await db
      .select()
      .from(gifts)
      .where(
        sql`${gifts.userId} = ${userId} AND (
          ${gifts.productName} ILIKE ${`%${searchTerm}%`} OR 
          ${gifts.description} ILIKE ${`%${searchTerm}%`}
        )`
      );

    return result;
  },
};
