import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Shared standard client
export const redisClient = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

// Used for Pub/Sub subscriber (cannot be shared with regular commands)
export const redisSubscriber = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

export * from 'ioredis';
