import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const requestHookPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook('onRequest', async (request, reply) => {
    const logPrefix = request.routeOptions.config.logPrefix || ''; // 从路由配置中读取 logPrefix
    request.log = request.log.child({ logPrefix });
    reply.log = request.log;
    request.log.info(`Request received: ${JSON.stringify(request.headers)}`);
  });
});

export default requestHookPlugin;
