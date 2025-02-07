import { logger } from './logger.util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });

prisma.$on('query', (event) => {
  logger.info(`Prisma Query: ${event.query}`);
  logger.info(`Prisma Params: ${event.params}`);
  logger.info(`Prisma Duration: ${event.duration}ms`);
});

export { prisma };
