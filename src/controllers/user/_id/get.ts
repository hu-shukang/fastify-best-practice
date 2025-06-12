import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { sql } from 'kysely';

import { db } from '@/database';
import { BookSummary } from '@/database/types/book.type';
import { userIdSchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: 'ユーザ取得',
        description: 'ユーザIDを指定してユーザを取得します',
        tags: [SCHEMA.tags.user.name],
        params: userIdSchema,
      },
    },
    async (req, _reply) => {
      const { id } = req.params;
      return await db
        .selectFrom('userTbl as u')
        .selectAll('u')
        .select((_eb) =>
          sql<BookSummary[]>`(
            SELECT COALESCE(json_agg(
              json_build_object('id', p.id, 'title', p.title, 'createdAt', p.created_at)
            ), '[]'::json)
            FROM book_tbl p
            WHERE p.user_id = u.id
          )`.as('books'),
        )
        .where('u.id', '=', id)
        .execute();
    },
  );
};

export default routes;
