import { prisma } from '@/util/prisma.util';
import fastifyRequestContext from '@fastify/request-context';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestContextPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(fastifyRequestContext, {
    defaultStoreValues: (request) => {
      const reqId = Math.random().toString(36).substring(2, 12);
      const logPrefix = request.routeOptions.config.logPrefix || '';
      const logger = request.log.child({ logPrefix, reqId });
      prisma.$on('query', (event) => {
        logger.info(`Prisma Query: ${event.query}`);
        logger.info(`Prisma Params: ${event.params}`);
        logger.info(`Prisma Duration: ${event.duration}ms`);
      });
      return {
        logger: logger,
        reqId: reqId,
      };
    },
  });
});

export default requestContextPlugin;
