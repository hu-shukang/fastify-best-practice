import { SCHEMA } from '../../utils/const.util';
import { logger } from '@/utils/logger.util';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const querySchema = z
  .object({
    id: SCHEMA.z.user.id.optional(),
    username: SCHEMA.z.user.username.optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).some((key) => data[key as keyof typeof data] !== undefined);
    },
    {
      message: '请求参数中必须至少提供 id 或 username 中的一个。',
    },
  );

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: 'ユーザ検索',
        description: 'Query条件でユーザを検索します',
        tags: [SCHEMA.tags.user.name],
        querystring: querySchema,
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
