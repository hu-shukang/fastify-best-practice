import { logger } from '@/utils/logger.util';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

async function managementAuthHooks(fastify: FastifyInstance, _opts: FastifyPluginOptions) {
  // 在这里添加的钩子将应用于 'controllers/management/' 目录下的所有路由
  fastify.addHook('preHandler', async (request: FastifyRequest, _reply: FastifyReply) => {
    logger.info(`[AutoHook - management] preHandler: ${request.raw.url}`);
  });
}

// 使用 fp() 包装插件，确保钩子能影响到同级路由
// 第一个参数是插件函数，第二个参数是可选的 fastify-plugin 选项，例如版本约束
export default fp(managementAuthHooks, { name: 'management-auth-hooks' });
