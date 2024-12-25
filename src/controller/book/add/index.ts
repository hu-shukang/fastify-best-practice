import { BookInput } from '@/model/book.model';
import { FastifyInstance } from 'fastify';
import { schema } from './schema';
import { BookService } from '@/service/book.service';

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

      return { status: 'success', data: { id } };
    },
  );
};

export default routes;
