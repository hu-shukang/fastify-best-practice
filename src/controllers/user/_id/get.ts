import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { UserEntity } from '@/entities/user.entity';
import { userIdSchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';
import { dataSource } from '@/utils/db.util';

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
      const repository = dataSource.getRepository(UserEntity);
      return await repository.findOneByOrFail({ id });
    },
  );
};

export default routes;
