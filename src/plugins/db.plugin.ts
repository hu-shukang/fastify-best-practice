import { destroyDataSource, initDataSource } from '@/utils/db.util';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const dbPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await initDataSource();

  fastify.addHook('onClose', async () => {
    await destroyDataSource();
  });
});

export default dbPlugin;
