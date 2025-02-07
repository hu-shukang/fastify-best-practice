import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });
prisma.$on('query', (event) => {
  import('@fastify/request-context').then(({ requestContext }) => {
    const logger = requestContext.get('logger') ?? console;
    logger.info(`Prisma Query: ${event.query}`);
    logger.info(`Prisma Params: ${event.params}`);
    logger.info(`Prisma Duration: ${event.duration}ms`);
  });
});
