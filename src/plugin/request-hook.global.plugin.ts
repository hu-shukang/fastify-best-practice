import { logger } from '@/util/logger.util';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestHookPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook('onRequest', (request, _reply, next) => {
    logger.info(`Request received: ${request.method} ${request.url}`);
    next();
  });
});

export default requestHookPlugin;
