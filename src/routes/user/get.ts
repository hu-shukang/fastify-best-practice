import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '@/database';
import { userQuerySchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: 'ユーザ検索',
        description: 'Query条件でユーザを検索します',
        tags: [SCHEMA.tags.user.name],
        querystring: userQuerySchema,
      },
    },
    async (req, _reply) => {
      const { id, username } = req.query;
      let query = db.selectFrom('userTbl');
      if (id) {
        query = query.where('id', '=', id);
      }
      if (username) {
        query = query.where('username', 'like', `%${username}%`);
      }
      query = query.orderBy('createdAt', 'desc');
      return await query.selectAll().execute();
    },
  );
};

export default routes;
