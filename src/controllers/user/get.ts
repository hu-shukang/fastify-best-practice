import { SCHEMA } from '../../utils/const.util';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const querySchema = z.object({
  id: z.string().uuid().describe(SCHEMA.desc.user.id),
  name: z.string().describe(SCHEMA.desc.user.name),
});

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
      const { id, name } = req.query;
      console.log(id, name);

      return { status: 'success' };
    },
  );
};

export default routes;
