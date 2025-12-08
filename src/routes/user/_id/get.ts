import { ChainsWithKysely } from '@tool-chain/db/kysely';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { Database } from '@/database/types';
import { badRequestSchema, notFoundSchema } from '@/models/common.model';
import { userGetResponseSchema, userIdSchema } from '@/models/user.model';
import { getUser } from '@/services/user.service';
import { SCHEMA } from '@/utils/const.util';
import { logger } from '@/utils/logger.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '',
    {
      schema: {
        summary: 'ユーザ取得',
        description: 'ユーザIDを指定してユーザを取得します',
        tags: [SCHEMA.tags.user.name],
        params: userIdSchema,
        response: {
          200: userGetResponseSchema,
          401: badRequestSchema,
          404: notFoundSchema,
        },
      },
    },
    async (req, _reply) => {
      const { id } = req.params;

      const result = await new ChainsWithKysely<Database>().use(fastify.db).chain(getUser(id)).invoke();
      logger.info(`result`, result);
      return result;
    },
  );
};

export default routes;
