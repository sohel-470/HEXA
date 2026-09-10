import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import { redisClient } from '@codeforge/redis';

const fastify = Fastify({ logger: true });

async function start() {
  // CORS
  await fastify.register(cors, {
    origin: '*', // Adjust for production
  });

  // JWT
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'super-secret-development-key'
  });

  // Rate Limiting via Redis
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    redis: redisClient,
  });

  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok', service: 'api-gateway' };
  });

  fastify.post('/auth/login', async (request, reply) => {
    // Placeholder login
    const token = fastify.jwt.sign({ userId: '123', role: 'USER' });
    return { token };
  });

  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('API Gateway listening on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
