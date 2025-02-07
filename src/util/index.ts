import { PrismaClient } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';
import { FastifyBaseLogger } from 'fastify';

export const asyncLocalStorage = new AsyncLocalStorage<{ logger: FastifyBaseLogger; reqId: string }>();

export const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });

prisma.$on('query', (event) => {
  const store = asyncLocalStorage.getStore();
  if (store) {
    const { logger } = store;
    logger.info(`Prisma Query: ${event.query}`);
    logger.info(`Prisma Params: ${event.params}`);
    logger.info(`Prisma Duration: ${event.duration}ms`);
  }
});

const getLogger = () => asyncLocalStorage.getStore()?.logger ?? console;

export const logger = {
  info: (msg: string) => getLogger().info(msg),
  error: (msg: string) => getLogger().error(msg),
  warn: (msg: string) => getLogger().warn(msg),
  debug: (msg: string) => getLogger().debug(msg),
};
