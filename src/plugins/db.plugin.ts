import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { destroyDataSource, initDataSource } from '@/utils/db.util';
import { logger } from '@/utils/logger.util';

const dbPlugin: FastifyPluginAsync = fp(async (fastify) => {
  logger.info('Initializing database connection...');
  await initDataSource();

  fastify.addHook('onClose', async () => {
    logger.info('Closing database connection...');
    await destroyDataSource();
  });
});

export default dbPlugin;
