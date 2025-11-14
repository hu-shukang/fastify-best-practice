import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { badRequestSchema } from '@/models/common.model';
import { userQueryResponseSchema, userQuerySchema } from '@/models/user.model';
import { queryUser } from '@/services/user.service';
import { Actions } from '@/utils/actions.util';
import { SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: 'ユーザ検索',
        description: 'Query条件でユーザを検索します',
        tags: [SCHEMA.tags.user.name],
        querystring: userQuerySchema,
        response: {
          200: userQueryResponseSchema,
          401: badRequestSchema,
        },
      },
    },
    async (req, _reply) => {
      return Actions().executeWithReturn(queryUser(req.query)).use(db).invoke();
    },
  );
};

export default routes;
