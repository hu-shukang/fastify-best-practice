import { ChainsWithKysely } from '@tool-chain/db/kysely';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { Database } from '@/database/types';
import { bookDeleteInputSchema } from '@/models/book.model';
import { badRequestSchema, successSchema } from '@/models/common.model';
import { deleteBook } from '@/services/book.service';
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

      await new ChainsWithKysely<Database>().use(fastify.db).chain(deleteBook(bookId)).invoke();

      return RESPONSE.success;
    },
  );
};

export default routes;
