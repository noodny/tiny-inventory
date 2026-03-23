import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import envPlugin from './plugins/env';
import prismaPlugin from './plugins/prisma';
import errorPlugin from './plugins/errors';
import storeRoutes from './routes/stores';
import productRoutes from './routes/products';
import inventoryRoutes from './routes/inventory';

import { PrismaClient } from '@prisma/client';

interface BuildAppOptions {
  prismaClient?: PrismaClient;
}

export function buildApp(opts: BuildAppOptions = {}) {
  const app = Fastify({
    logger: true,
    ajv: {
      customOptions: { coerceTypes: true, removeAdditional: true },
    },
  });

  app.register(envPlugin);

  app.after(() => {
    app.log.level = app.config.LOG_LEVEL;

    app.register(cors, { origin: app.config.CORS_ORIGIN });
    app.register(prismaPlugin, { prismaClient: opts.prismaClient });
    app.register(errorPlugin);

    app.register(storeRoutes, { prefix: '/api' });
    app.register(productRoutes, { prefix: '/api' });
    app.register(inventoryRoutes, { prefix: '/api' });

    app.get('/health', async () => ({ status: 'ok' }));

    if (app.config.NODE_ENV === 'production') {
      const staticRoot = path.join(__dirname, '../../frontend/dist');
      app.register(fastifyStatic, {
        root: staticRoot,
        prefix: '/',
        decorateReply: false,
      });

      app.setNotFoundHandler(async (_request, reply) => {
        return reply.sendFile('index.html', staticRoot);
      });
    }
  });

  return app;
}
