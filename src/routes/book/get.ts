import { ChainsWithKysely } from '@tool-chain/db/kysely';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { Database } from '@/database/types';
import { bookQueryResponseSchema, bookQuerySchema } from '@/models/book.model';
import { badRequestSchema } from '@/models/common.model';
import { queryBooks } from '@/services/book.service';
import { SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: '書籍検索',
        description: 'Query条件で書籍を検索します',
        tags: [SCHEMA.tags.book.name],
        querystring: bookQuerySchema,
        response: {
          200: bookQueryResponseSchema,
          401: badRequestSchema,
        },
      },
    },
    async (req, _reply) => {
      return await new ChainsWithKysely<Database>().use(fastify.db).chain(queryBooks(req.query)).invoke();
    },
  );
};

export default routes;
