import { BookInput } from '@/model/book.model';
import { FastifyInstance } from 'fastify';
import { schema } from './schema';
import { getId } from '@/util/string.util';
import { getUTC } from '@/util/date.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: BookInput }>(
    '/book',
    {
      schema: schema,
      config: {
        logPrefix: '書籍追加',
      },
    },
    async (req, _reply) => {
      const id = getId();
      const createdAt = getUTC();
      const { title, content } = req.body;

      req.log.info(JSON.stringify({ id, title, content, createdAt }));

      // TODO: Add book to database
      // await bookService.add({ id, title, content, createdAt });

      return { status: 'success', data: { id } };
    },
  );
};

export default routes;
