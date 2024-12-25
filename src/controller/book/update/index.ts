import { BookIdInput, BookInput } from '@/model/book.model';
import { FastifyInstance } from 'fastify';
import { schema } from './schema';

const routes = async (fastify: FastifyInstance) => {
  fastify.put<{ Params: BookIdInput; Body: BookInput }>(
    '/book/:id',
    {
      schema: schema,
    },
    async (req, _reply) => {
      const { id } = req.params;
      const { title, content } = req.body;

      req.log.info({ id, title, content }, 'Update book');

      // TODO: Update book in database
      // const book = await bookService.update(id, { title, content });

      return { status: 'success' };
    },
  );
};

export default routes;
