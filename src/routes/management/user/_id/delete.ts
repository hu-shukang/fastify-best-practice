import { ChainsWithKysely } from '@tool-chain/db/kysely';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { Database } from '@/database/types';
import { badRequestSchema } from '@/models/common.model';
import { userIdSchema } from '@/models/user.model';
import { deleteUser } from '@/services/user.service';
import { SCHEMA } from '@/utils/const.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '',
    {
      schema: {
        summary: 'ユーザ削除',
        description: 'ユーザIDを指定してユーザを削除します',
        tags: [SCHEMA.tags.management.name],
        params: userIdSchema,
        response: {
          204: {},
          401: badRequestSchema,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;

      await new ChainsWithKysely<Database>().use(fastify.db).chain(deleteUser(id)).invoke();

      return reply.status(204).send();
    },
  );
};

export default routes;
