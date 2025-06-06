import { UserEntity } from '@/entities/user.entity';
import { userIdSchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

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
      const userEntity = UserEntity.create({ id });
      await UserEntity.softRemove(userEntity);

      return reply.status(200).send();
    },
  );
};

export default routes;
