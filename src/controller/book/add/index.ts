import { BookInput } from '@/model/book.model';
import { FastifyInstance } from 'fastify';
import { schema } from './schema';
import { BookService } from '@/service/book.service';
import { logger } from '@/util/logger.util';

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
      const form = req.body;

      const bookService = new BookService(req.log);
      const id = await bookService.add(form);
      logger.info(`書籍を追加しました。id: ${id}`);
      return { status: 'success', data: { id } };
    },
  );
};

export default routes;
