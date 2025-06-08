import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { UserEntity } from '@/entities/user.entity';
import { userCreateInputSchema } from '@/models/user.model';
import { SCHEMA } from '@/utils/const.util';
import { dataSource } from '@/utils/db.util';
import { Str } from '@/utils/string.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '',
    {
      schema: {
        summary: 'ユーザ登録',
        description: 'ユーザ登録API',
        tags: [SCHEMA.tags.user.name],
        body: userCreateInputSchema,
      },
    },
    async (req, _reply) => {
      const form = req.body;
      const id = Str.uuid();
      const repository = dataSource.getRepository(UserEntity);
      const userEntity = repository.create({ ...form, id });

      await repository.insert(userEntity);

      return { id };
    },
  );
};

export default routes;
