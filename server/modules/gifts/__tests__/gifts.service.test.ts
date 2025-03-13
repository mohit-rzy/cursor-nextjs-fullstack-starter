import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { giftsService } from '../gifts.service';
import { giftsRepository } from '../gifts.repository';
import { TRPCError } from '@trpc/server';
import type { Gift } from '../gifts.db';

// Mock the gifts repository
jest.mock('../gifts.repository', () => ({
  giftsRepository: {
    createGift: jest.fn(),
    getGiftById: jest.fn(),
    getGiftsByUserId: jest.fn(),
    updateGift: jest.fn(),
    deleteGift: jest.fn(),
    searchGifts: jest.fn(),
  },
}));

// Type the mocked repository functions
const mockedCreateGift = giftsRepository.createGift as jest.MockedFunction<
  typeof giftsRepository.createGift
>;
const mockedGetGiftById = giftsRepository.getGiftById as jest.MockedFunction<
  typeof giftsRepository.getGiftById
>;
const mockedGetGiftsByUserId =
  giftsRepository.getGiftsByUserId as jest.MockedFunction<
    typeof giftsRepository.getGiftsByUserId
  >;
const mockedUpdateGift = giftsRepository.updateGift as jest.MockedFunction<
  typeof giftsRepository.updateGift
>;
const mockedDeleteGift = giftsRepository.deleteGift as jest.MockedFunction<
  typeof giftsRepository.deleteGift
>;
const mockedSearchGifts = giftsRepository.searchGifts as jest.MockedFunction<
  typeof giftsRepository.searchGifts
>;

describe('Gifts Service', () => {
  const testUserId = 'test-user-id';
  const testGiftId = 1;
  const mockGift: Gift = {
    id: testGiftId,
    userId: testUserId,
    productName: 'Test Gift',
    description: 'Test Description',
    price: '99.99',
    importanceLevel: 'HIGH',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createGift', () => {
    it('should create a gift successfully', async () => {
      // Arrange
      mockedCreateGift.mockResolvedValue(mockGift);

      // Act
      const result = await giftsService.createGift({
        userId: testUserId,
        productName: 'Test Gift',
        description: 'Test Description',
        price: '99.99',
        importanceLevel: 'HIGH',
      });

      // Assert
      expect(result).toEqual(mockGift);
      expect(mockedCreateGift).toHaveBeenCalledWith({
        userId: testUserId,
        productName: 'Test Gift',
        description: 'Test Description',
        price: '99.99',
        importanceLevel: 'HIGH',
      });
    });

    it('should throw an error when repository fails', async () => {
      // Arrange
      const error = new Error('Database error');
      mockedCreateGift.mockRejectedValue(error);

      // Act & Assert
      await expect(
        giftsService.createGift({
          userId: testUserId,
          productName: 'Test Gift',
          description: 'Test Description',
          price: '99.99',
          importanceLevel: 'HIGH',
        })
      ).rejects.toThrow(TRPCError);
    });
  });

  describe('getGiftById', () => {
    it('should get a gift by ID successfully', async () => {
      // Arrange
      mockedGetGiftById.mockResolvedValue(mockGift);

      // Act
      const result = await giftsService.getGiftById(testGiftId, testUserId);

      // Assert
      expect(result).toEqual(mockGift);
      expect(mockedGetGiftById).toHaveBeenCalledWith(testGiftId, testUserId);
    });

    it('should throw a NOT_FOUND error when gift does not exist', async () => {
      // Arrange
      mockedGetGiftById.mockResolvedValue(undefined);

      // Act & Assert
      await expect(
        giftsService.getGiftById(testGiftId, testUserId)
      ).rejects.toThrow(TRPCError);
    });

    it('should throw an error when repository fails', async () => {
      // Arrange
      const error = new Error('Database error');
      mockedGetGiftById.mockRejectedValue(error);

      // Act & Assert
      await expect(
        giftsService.getGiftById(testGiftId, testUserId)
      ).rejects.toThrow(TRPCError);
    });
  });

  describe('getGiftsByUserId', () => {
    it('should get all gifts for a user successfully', async () => {
      // Arrange
      const mockGifts = [mockGift];
      mockedGetGiftsByUserId.mockResolvedValue(mockGifts);

      // Act
      const result = await giftsService.getGiftsByUserId(testUserId);

      // Assert
      expect(result).toEqual(mockGifts);
      expect(mockedGetGiftsByUserId).toHaveBeenCalledWith(
        testUserId,
        'createdAt',
        'desc'
      );
    });

    it('should throw an error when repository fails', async () => {
      // Arrange
      const error = new Error('Database error');
      mockedGetGiftsByUserId.mockRejectedValue(error);

      // Act & Assert
      await expect(giftsService.getGiftsByUserId(testUserId)).rejects.toThrow(
        TRPCError
      );
    });
  });

  describe('updateGift', () => {
    it('should update a gift successfully', async () => {
      // Arrange
      const updatedGift = { ...mockGift, productName: 'Updated Gift' };
      mockedUpdateGift.mockResolvedValue(updatedGift);

      // Act
      const result = await giftsService.updateGift(testGiftId, testUserId, {
        productName: 'Updated Gift',
      });

      // Assert
      expect(result).toEqual(updatedGift);
      expect(mockedUpdateGift).toHaveBeenCalledWith(testGiftId, testUserId, {
        productName: 'Updated Gift',
      });
    });

    it('should throw a NOT_FOUND error when gift does not exist', async () => {
      // Arrange
      mockedUpdateGift.mockResolvedValue(undefined);

      // Act & Assert
      await expect(
        giftsService.updateGift(testGiftId, testUserId, {
          productName: 'Updated Gift',
        })
      ).rejects.toThrow(TRPCError);
    });

    it('should throw an error when repository fails', async () => {
      // Arrange
      const error = new Error('Database error');
      mockedUpdateGift.mockRejectedValue(error);

      // Act & Assert
      await expect(
        giftsService.updateGift(testGiftId, testUserId, {
          productName: 'Updated Gift',
        })
      ).rejects.toThrow(TRPCError);
    });
  });

  describe('deleteGift', () => {
    it('should delete a gift successfully', async () => {
      // Arrange
      mockedDeleteGift.mockResolvedValue(true);

      // Act
      const result = await giftsService.deleteGift(testGiftId, testUserId);

      // Assert
      expect(result).toBe(true);
      expect(mockedDeleteGift).toHaveBeenCalledWith(testGiftId, testUserId);
    });

    it('should throw a NOT_FOUND error when gift does not exist', async () => {
      // Arrange
      mockedDeleteGift.mockResolvedValue(false);

      // Act & Assert
      await expect(
        giftsService.deleteGift(testGiftId, testUserId)
      ).rejects.toThrow(TRPCError);
    });

    it('should throw an error when repository fails', async () => {
      // Arrange
      const error = new Error('Database error');
      mockedDeleteGift.mockRejectedValue(error);

      // Act & Assert
      await expect(
        giftsService.deleteGift(testGiftId, testUserId)
      ).rejects.toThrow(TRPCError);
    });
  });

  describe('searchGifts', () => {
    it('should search gifts successfully', async () => {
      // Arrange
      const mockGifts = [mockGift];
      mockedSearchGifts.mockResolvedValue(mockGifts);

      // Act
      const result = await giftsService.searchGifts(testUserId, 'Test');

      // Assert
      expect(result).toEqual(mockGifts);
      expect(mockedSearchGifts).toHaveBeenCalledWith(testUserId, 'Test');
    });

    it('should throw an error when repository fails', async () => {
      // Arrange
      const error = new Error('Database error');
      mockedSearchGifts.mockRejectedValue(error);

      // Act & Assert
      await expect(
        giftsService.searchGifts(testUserId, 'Test')
      ).rejects.toThrow(TRPCError);
    });
  });
});
