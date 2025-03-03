import fastifyRequestContext from '@fastify/request-context';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestContextPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(fastifyRequestContext, {
    defaultStoreValues: (request) => {
      const reqId = Math.random().toString(36).substring(2, 12);
      const logPrefix = request.routeOptions.config.logPrefix || '';
      const logger = request.log.child({ logPrefix, reqId });
      return {
        logger: logger,
        reqId: reqId,
      };
    },
  });
});

export default requestContextPlugin;
