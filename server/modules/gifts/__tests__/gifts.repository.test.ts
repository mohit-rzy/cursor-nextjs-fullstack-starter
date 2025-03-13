import '@jest/globals';
import { giftsRepository } from '../gifts.repository';
import { db, pool } from '../../../core/db';
import { gifts } from '../gifts.db';
import { sql } from 'drizzle-orm';

describe('Gifts Repository', () => {
  const testUserId = 'test-user-id';
  let testGiftId: number;

  // Clean up before tests
  beforeAll(async () => {
    // Delete any existing test data
    await db.delete(gifts).where(sql`user_id = ${testUserId}`);
  });

  // Clean up after tests
  afterAll(async () => {
    // Delete test data
    await db.delete(gifts).where(sql`user_id = ${testUserId}`);
    // Close the database connection
    await pool.end();
  });

  it('should create a gift', async () => {
    const gift = await giftsRepository.createGift({
      userId: testUserId,
      productName: 'Test Gift',
      description: 'Test Description',
      price: '99.99',
      importanceLevel: 'HIGH',
    });

    expect(gift).toBeDefined();
    expect(gift.id).toBeDefined();
    expect(gift.productName).toBe('Test Gift');
    expect(gift.description).toBe('Test Description');
    expect(gift.price).toBe('99.99');
    expect(gift.importanceLevel).toBe('HIGH');

    // Save the ID for later tests
    testGiftId = gift.id;
  });

  it('should get a gift by ID', async () => {
    const gift = await giftsRepository.getGiftById(testGiftId, testUserId);

    expect(gift).toBeDefined();
    expect(gift?.id).toBe(testGiftId);
    expect(gift?.productName).toBe('Test Gift');
  });

  it('should get all gifts for a user', async () => {
    const gifts = await giftsRepository.getGiftsByUserId(testUserId);

    expect(gifts).toBeDefined();
    expect(gifts.length).toBeGreaterThan(0);
    expect(gifts[0].userId).toBe(testUserId);
  });

  it('should update a gift', async () => {
    const updatedGift = await giftsRepository.updateGift(
      testGiftId,
      testUserId,
      {
        productName: 'Updated Gift',
        importanceLevel: 'MEDIUM',
      }
    );

    expect(updatedGift).toBeDefined();
    expect(updatedGift?.id).toBe(testGiftId);
    expect(updatedGift?.productName).toBe('Updated Gift');
    expect(updatedGift?.importanceLevel).toBe('MEDIUM');
  });

  it('should delete a gift', async () => {
    const deleted = await giftsRepository.deleteGift(testGiftId, testUserId);
    expect(deleted).toBe(true);

    // Verify it's gone
    const gift = await giftsRepository.getGiftById(testGiftId, testUserId);
    expect(gift).toBeUndefined();
  });
});
