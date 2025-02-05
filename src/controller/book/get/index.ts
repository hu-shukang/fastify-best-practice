import { BookIdInput } from '@/model/book.model';
import { FastifyInstance } from 'fastify';
import { schema } from './schema';
import { logger } from '@/util/logger.util';

const routes = async (fastify: FastifyInstance) => {
  fastify.get<{ Params: BookIdInput }>(
    '/book/:id',
    {
      schema: schema,
      config: {
        logPrefix: '書籍取得',
      },
    },
    async (req, _reply) => {
      const { id } = req.params;

      logger.info(JSON.stringify({ id }));

      // TODO: Delete book from database
      // const bookDetail = await bookService.get(id);

      return {
        status: 'success',
        data: {
          id: 'xx',
          title: 'xx',
          content: 'xx',
          createdAt: 'xx',
          updatedAt: 'xx',
        },
      };
    },
  );
};

export default routes;
