import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { UserEntity } from '@/entities/user.entity';
import { userIdSchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';
import { dataSource } from '@/utils/db.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '',
    {
      schema: {
        summary: 'ユーザ削除',
        description: 'ユーザIDを指定してユーザを削除します',
        tags: [SCHEMA.tags.user.name],
        params: userIdSchema,
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const repository = dataSource.getRepository(UserEntity);
      await repository.softDelete({ id });

      return reply.status(200).send();
    },
  );
};

export default routes;
