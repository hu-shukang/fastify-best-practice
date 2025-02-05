import { asyncLocalStorage } from '@/util/async-storage.util';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestHookPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook('onRequest', (request, reply, next) => {
    const reqId = Math.random().toString(36).substring(2, 12);
    const logPrefix = request.routeOptions.config.logPrefix || '';
    request.log = request.log.child({ logPrefix, reqId });
    reply.log = request.log;
    request.log.info(`Request received: ${request.method} ${request.url}`);
    const context = { logger: request.log, reqId: reqId };
    asyncLocalStorage.run(context, () => {
      next();
    });
  });
});

export default requestHookPlugin;
