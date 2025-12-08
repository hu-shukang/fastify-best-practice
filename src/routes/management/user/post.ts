import { ChainsWithKysely } from '@tool-chain/db/kysely';
import dayjs from 'dayjs';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { Database } from '@/database/types';
import { badRequestSchema } from '@/models/common.model';
import { userCreateInputSchema, userCreateResponseSchema } from '@/models/user.model';
import { addUser } from '@/services/user.service';
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

      await new ChainsWithKysely<Database>()
        .use(fastify.db)
        .chain(addUser({ id, ...form, createdAt: dayjs().toDate() }))
        .invoke();

      return { id };
    },
  );
};

export default routes;
