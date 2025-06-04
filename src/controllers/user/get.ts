import { userQuerySchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';
import { logger } from '@/utils/logger.util';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: 'ユーザ検索',
        description: 'Query条件でユーザを検索します',
        tags: [SCHEMA.tags.user.name],
        querystring: userQuerySchema,
      },
    },
    async (req, _reply) => {
      const form = req.query;
      logger.info(form);

      return { status: 'success' };
    },
  );
};

export default routes;
