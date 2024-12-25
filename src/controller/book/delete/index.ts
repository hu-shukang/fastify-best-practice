import { BookIdInput } from '@/model/book.model';
import { FastifyInstance } from 'fastify';
import { schema } from './schema';

const routes = async (fastify: FastifyInstance) => {
  fastify.delete<{ Params: BookIdInput }>(
    '/book/:id',
    {
      schema: schema,
    },
    async (req, _reply) => {
      const { id } = req.params;

      req.log.info({ id }, 'Delete book');

      // TODO: Delete book from database
      // await bookService.delete(id);

      return { status: 'success' };
    },
  );
};

export default routes;
