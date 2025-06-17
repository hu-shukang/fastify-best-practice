import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { bookDeleteInputSchema } from '@/models/book.model';
import { badRequestSchema, successSchema } from '@/models/common.model';
import { RESPONSE, SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '',
    {
      schema: {
        summary: '書籍削除',
        description: 'ユーザIDで書籍を削除します',
        tags: [SCHEMA.tags.user.name],
        params: bookDeleteInputSchema,
        response: {
          200: successSchema,
          401: badRequestSchema,
        },
      },
    },
    async (req, _reply) => {
      const { id: userId, bookId } = req.params;

      await db.deleteFrom('bookTbl').where('id', '=', bookId).where('userId', '=', userId).execute();

      return RESPONSE.success;
    },
  );
};

export default routes;
