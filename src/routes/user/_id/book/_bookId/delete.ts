import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { bookDeleteInputSchema } from '@/models/book.model';
import { SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '',
    {
      schema: {
        summary: '書籍削除',
        description: 'ユーザIDで書籍を削除します',
        tags: [SCHEMA.tags.user.name],
        params: bookDeleteInputSchema,
      },
    },
    async (req, reply) => {
      const { id: userId, bookId } = req.params;

      await db.deleteFrom('bookTbl').where('id', '=', bookId).where('userId', '=', userId).execute();

      return reply.status(200).send();
    },
  );
};

export default routes;
