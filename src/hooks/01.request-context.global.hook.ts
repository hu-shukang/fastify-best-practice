import fastifyRequestContext from '@fastify/request-context';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestContextHook: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(fastifyRequestContext, {
    defaultStoreValues: (request) => {
      const summary = request.routeOptions.schema?.summary || '';
      const logger = request.log.child({ summary });
      request.log = logger;
      return {
        logger: logger,
        reqId: request.id,
      };
    },
    hook: 'onRequest',
  });
});

export default requestContextHook;
