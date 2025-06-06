import { logger } from '@/utils/logger.util';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

async function managementAuthHooks(fastify: FastifyInstance, _opts: FastifyPluginOptions) {
  fastify.addHook('preHandler', async (request: FastifyRequest, _reply: FastifyReply) => {
    logger.info(`[AutoHook - management] preHandler: ${request.raw.url}`);
  });
}

export default fp(managementAuthHooks, { name: 'management-auth-hooks' });
