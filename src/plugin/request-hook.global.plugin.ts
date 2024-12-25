import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestHookPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook('onRequest', async (request, _reply) => {
    request.log.info(`Request received: ${JSON.stringify(request.headers)}`);
  });
});

export default requestHookPlugin;
