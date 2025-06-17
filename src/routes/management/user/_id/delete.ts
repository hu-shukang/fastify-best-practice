import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { badRequestSchema, successSchema } from '@/models/common.model';
import { userIdSchema } from '@/models/user.model';
import { RESPONSE, SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '',
    {
      schema: {
        summary: 'ユーザ削除',
        description: 'ユーザIDを指定してユーザを削除します',
        tags: [SCHEMA.tags.management.name],
        params: userIdSchema,
        response: {
          200: successSchema,
          401: badRequestSchema,
        },
      },
    },
    async (req, _reply) => {
      const { id } = req.params;

      await db.deleteFrom('userTbl').where('id', '=', id).execute();

      return RESPONSE.success;
    },
  );
};

export default routes;
