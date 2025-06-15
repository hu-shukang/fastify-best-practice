import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { bookCreateInputSchema } from '@/models/book.model';
import { userIdSchema } from '@/models/user.model';
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
      },
    },
    async (req, _reply) => {
      const form = req.body;
      const { id: userId } = req.params;

      const id = Str.uuid();
      await db
        .insertInto('bookTbl')
        .values({ ...form, id, userId })
        .execute();

      return { id };
    },
  );
};

export default routes;
