import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { closeDB, createDB } from '@/database';

const dbPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const db = createDB(fastify.config);
  fastify.decorate('db', db);

  fastify.addHook('onClose', async () => {
    await closeDB(db);
  });
});

export default dbPlugin;
