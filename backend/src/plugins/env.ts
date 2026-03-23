import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      LOG_LEVEL: string;
      CORS_ORIGIN: string;
      NODE_ENV: string;
    };
  }
}

const schema = {
  type: 'object' as const,
  required: [],
  properties: {
    PORT: { type: 'number' as const, default: 3000 },
    LOG_LEVEL: { type: 'string' as const, default: 'info' },
    CORS_ORIGIN: { type: 'string' as const, default: 'http://localhost:5173' },
    NODE_ENV: { type: 'string' as const, default: 'development' },
  },
};

export default fp(
  async (fastify) => {
    await fastify.register(fastifyEnv, { schema, dotenv: true });
  },
  { name: 'env' },
);
