import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { logger } from '@/utils/logger.util';

async function managementAuthHooks(fastify: FastifyInstance, _opts: FastifyPluginOptions) {
  fastify.addHook('preHandler', async (request: FastifyRequest, _reply: FastifyReply) => {
    logger.info(`[AutoHook - management] preHandler: ${request.raw.url}`);
  });
}

export default fp(managementAuthHooks, { name: 'management-auth-hooks' });
