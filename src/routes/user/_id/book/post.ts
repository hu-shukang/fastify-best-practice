import { ChainsWithKysely } from '@tool-chain/db/kysely';
import dayjs from 'dayjs';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { Database } from '@/database/types';
import { bookCreateInputSchema, bookCreateResponseSchema } from '@/models/book.model';
import { badRequestSchema } from '@/models/common.model';
import { userIdSchema } from '@/models/user.model';
import { addBook } from '@/services/book.service';
import { SCHEMA } from '@/utils/const.util';
import { Str } from '@/utils/string.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '',
    {
      schema: {
        summary: '書籍登録',
        description: 'ユーザから書籍を登録します',
        tags: [SCHEMA.tags.user.name],
        params: userIdSchema,
        body: bookCreateInputSchema,
        response: {
          200: bookCreateResponseSchema,
          401: badRequestSchema,
        },
      },
    },
    async (req, _reply) => {
      const form = req.body;
      const { id: userId } = req.params;

      const id = Str.uuid();

      await new ChainsWithKysely<Database>()
        .use(fastify.db)
        .chain(addBook({ ...form, id, userId, createdAt: dayjs().toDate() }))
        .invoke();

      return { id };
    },
  );
};

export default routes;
