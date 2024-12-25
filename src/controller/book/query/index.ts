import { BookQueryInput } from '@/model/book.model';
import { FastifyInstance } from 'fastify';
import { schema } from './schema';

const routes = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: BookQueryInput }>(
    '/book',
    {
      schema: schema,
      config: {
        logPrefix: '書籍検索',
      },
    },
    async (req, _reply) => {
      const { title, content } = req.query;

      req.log.info({ title, content }, 'Query book');

      // TODO: Query book from database
      // const bookList = await bookService.query({ title, content });

      return {
        status: 'success',
        data: [
          {
            id: 'xx',
            title: 'xx',
            createdAt: 'xx',
            updatedAt: 'xx',
          },
        ],
      };
    },
  );
};

export default routes;
