import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { badRequestSchema } from '@/models/common.model';
import { userCreateInputSchema, userCreateResponseSchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';
import { Str } from '@/utils/string.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '',
    {
      schema: {
        summary: 'ユーザ登録',
        description: 'ユーザ登録API',
        tags: [SCHEMA.tags.management.name],
        body: userCreateInputSchema,
        response: {
          200: userCreateResponseSchema,
          401: badRequestSchema,
        },
      },
    },
    async (req, _reply) => {
      const form = req.body;
      const id = Str.uuid();

      await db
        .insertInto('userTbl')
        .values({ ...form, id })
        .execute();

      return { id };
    },
  );
};

export default routes;
