import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { bookQuerySchema } from '@/models/book.model';
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
      },
    },
    async (req, _reply) => {
      const { id, username, title } = req.query;
      let query = db.selectFrom('bookTbl as b').selectAll('b');
      if (id) {
        query = query.where('b.id', '=', id);
      }
      if (title) {
        query = query.where('b.title', 'like', `%${title}%`);
      }
      if (username) {
        query = query.innerJoin('userTbl as u', 'b.userId', 'u.id').where('u.username', 'like', `%${username}%`);
      }
      return await query.execute();
    },
  );
};

export default routes;
