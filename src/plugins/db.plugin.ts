import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { closeDB, createDB } from '@/database';
import { logger } from '@/utils/logger.util';

const dbPlugin: FastifyPluginAsync = fp(async (fastify) => {
  logger.info('Initializing database connection...');
  createDB();

  fastify.addHook('onClose', async () => {
    logger.info('Closing database connection...');
    await closeDB();
  });
});

export default dbPlugin;
