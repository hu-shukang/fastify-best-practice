import { asyncLocalStorage } from '@/util';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestHookPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook('onRequest', (request, _reply, next) => {
    const reqId = Math.random().toString(36).substring(2, 12);
    const logPrefix = request.routeOptions.config.logPrefix || '';
    const logger = request.log.child({ logPrefix, reqId });
    asyncLocalStorage.run({ logger, reqId }, () => {
      logger.info(`Request received: ${request.method} ${request.url}`);
      next();
    });
  });
});

export default requestHookPlugin;
