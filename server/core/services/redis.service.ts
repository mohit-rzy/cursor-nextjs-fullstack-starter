import { createClient, RedisClientType } from 'redis';
import { logger } from './logger.service';

// Redis client configuration
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Create Redis client
export const redisClient: RedisClientType = createClient({
  url: REDIS_URL,
});

// Connect to Redis when initializing the service
redisClient.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});

/**
 * Initialize Redis connection
 */
export const initRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
};

/**
 * Graceful shutdown for Redis client
 */
export const closeRedisConnection = async () => {
  await redisClient.quit();
  logger.info('Redis connection closed');
};
