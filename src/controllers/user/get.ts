import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { ILike, IsNull } from 'typeorm';

import { UserEntity } from '@/entities/user.entity';
import { userQuerySchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';
import { dataSource } from '@/utils/db.util';

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
      const repository = dataSource.getRepository(UserEntity);
      return await repository.find({
        where: {
          deleteAt: IsNull(),
          id: id,
          username: username ? ILike(`%${username}%`) : undefined,
        },
        order: {
          createdAt: 'DESC',
        },
      });
    },
  );
};

export default routes;
