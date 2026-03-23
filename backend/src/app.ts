import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import prismaPlugin from './plugins/prisma';

import { PrismaClient } from '@prisma/client';

interface BuildAppOptions {
  prismaClient?: PrismaClient;
}

export function buildApp(opts: BuildAppOptions = {}) {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
    },
  });

  app.register(cors, {
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  });

  app.register(prismaPlugin, { prismaClient: opts.prismaClient });

  app.get('/health', async () => ({ status: 'ok' }));

  // Serve built frontend in production
  if (process.env.NODE_ENV === 'production') {
    const staticRoot = path.join(__dirname, '../../frontend/dist');
    app.register(fastifyStatic, {
      root: staticRoot,
      prefix: '/',
      decorateReply: false,
    });

    // Fall through to index.html for SPA routing
    app.setNotFoundHandler(async (_request, reply) => {
      return reply.sendFile('index.html', staticRoot);
    });
  }

  return app;
}
