"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const redis_1 = require("@codeforge/redis");
const fastify = (0, fastify_1.default)({ logger: true });
async function start() {
    // CORS
    await fastify.register(cors_1.default, {
        origin: '*', // Adjust for production
    });
    // JWT
    await fastify.register(jwt_1.default, {
        secret: process.env.JWT_SECRET || 'super-secret-development-key'
    });
    // Rate Limiting via Redis
    await fastify.register(rate_limit_1.default, {
        max: 100,
        timeWindow: '1 minute',
        redis: redis_1.redisClient,
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
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=index.js.map