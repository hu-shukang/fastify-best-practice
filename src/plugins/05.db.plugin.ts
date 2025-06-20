import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { closeDB, createDB } from '@/database';

const dbPlugin: FastifyPluginAsync = fp(async (fastify) => {
  createDB(fastify);

  fastify.addHook('onClose', async () => {
    await closeDB();
  });
});

export default dbPlugin;
