import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { bookDeleteInputSchema } from '@/models/book.model';
import { badRequestSchema, successSchema } from '@/models/common.model';
import { deleteBook } from '@/services/book.service';
import { Actions } from '@/utils/actions.util';
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
      const { bookId } = req.params;

      await Actions().execute(deleteBook(bookId)).use(db).invoke();

      return RESPONSE.success;
    },
  );
};

export default routes;
