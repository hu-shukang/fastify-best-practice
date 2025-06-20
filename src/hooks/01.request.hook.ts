import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { ALS } from '@/utils/als.util';

const requestHookPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook('onRequest', (request, _reply, next) => {
    const summary = request.routeOptions.schema?.summary || '';
    const logger = request.log.child({ summary });
    request.log = logger;
    logger.info(`Request received: ${request.method} ${request.url}`);

    ALS.asyncStore.run({ logger: logger }, () => {
      next();
    });
  });
});

export default requestHookPlugin;
