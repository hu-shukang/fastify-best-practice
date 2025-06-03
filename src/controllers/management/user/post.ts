import { SCHEMA } from '../../../utils/const.util';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const bodySchema = z.object({
  name: z.string().describe(SCHEMA.desc.user.name),
  address: z.string().describe(SCHEMA.desc.user.address),
  birthday: z.string().datetime().describe(SCHEMA.desc.user.birthday),
  email: z.string().email().describe(SCHEMA.desc.user.email),
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
      console.log(form);

      return { status: 'success' };
    },
  );
};

export default routes;
