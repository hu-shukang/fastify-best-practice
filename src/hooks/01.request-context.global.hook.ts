import fastifyRequestContext from '@fastify/request-context';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestContextHook: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(fastifyRequestContext, {
    defaultStoreValues: (request) => {
      const reqId = Math.random().toString(36).substring(2, 12);
      const summary = request.routeOptions.schema?.summary || '';
      const logger = request.log.child({ summary, reqId });

      return {
        logger: logger,
        reqId: reqId,
      };
    },
    hook: 'onRequest',
  });
});

export default requestContextHook;
