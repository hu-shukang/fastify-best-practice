import { logger } from '@/utils/logger.util';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestHookPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook('preValidation', (request, _reply, next) => {
    logger.info(`Request received: ${request.method} ${request.url}`);
    if (request.body) {
      logger.info(request.body, 'Request body');
    }
    next();
  });
});

export default requestHookPlugin;
