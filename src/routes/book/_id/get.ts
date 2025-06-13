import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { bookIdSchema } from '@/models/book.model';
import { SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: '書籍取得',
        description: 'Book IDで書籍を取得します',
        tags: [SCHEMA.tags.book.name],
        params: bookIdSchema,
      },
    },
    async (req, _reply) => {
      const { id } = req.params;
      return await db.selectFrom('bookTbl').where('id', '=', id).selectAll().executeTakeFirstOrThrow();
    },
  );
};

export default routes;
