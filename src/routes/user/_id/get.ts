import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { badRequestSchema, notFoundSchema } from '@/models/common.model';
import { userGetResponseSchema, userIdSchema } from '@/models/user.model';
import { getUser } from '@/services/user.service';
import { Actions } from '@/utils/actions.util';
import { SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: 'ユーザ取得',
        description: 'ユーザIDを指定してユーザを取得します',
        tags: [SCHEMA.tags.user.name],
        params: userIdSchema,
        response: {
          200: userGetResponseSchema,
          401: badRequestSchema,
          404: notFoundSchema,
        },
      },
    },
    async (req, _reply) => {
      const { id } = req.params;

      return Actions().executeWithReturn(getUser(id)).use(db).invoke();
    },
  );
};

export default routes;
