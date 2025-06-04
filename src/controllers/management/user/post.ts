import { SCHEMA } from '../../../utils/const.util';
import { UserEntity } from '@/entities/user.entity';
import { logger } from '@/utils/logger.util';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const bodySchema = z.object({
  username: SCHEMA.z.user.username,
  address: SCHEMA.z.user.address,
  birthday: SCHEMA.z.user.birthday,
  email: SCHEMA.z.user.email,
});

const routes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '',
    {
      schema: {
        summary: 'ユーザ登録',
        description: 'ユーザ登録API',
        tags: [SCHEMA.tags.user.name],
        body: bodySchema,
      },
    },
    async (req, _reply) => {
      const form = req.body;

      return { status: 'success' };
    },
  );
};

export default routes;
