import { FastifyInstance } from 'fastify';
import { bookDesc, BookIdInput } from '@/model/book.model';
import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';

const paramsSchema: JSONSchemaType<BookIdInput> = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid', description: bookDesc.id },
  },
  required: ['id'],
  additionalProperties: false,
};

export const schema: FastifySchema = {
  summary: '書籍削除',
  description: '書籍を削除します。',
  tags: ['book'],
  params: paramsSchema,
  response: {
    200: {
      description: '成功',
      type: 'object',
      properties: {
        status: { type: 'string', const: 'success' },
      },
    },
  },
};

const routes = async (fastify: FastifyInstance) => {
  fastify.delete<{ Params: BookIdInput }>(
    '/',
    {
      schema: schema,
      config: {
        logPrefix: '書籍削除',
      },
    },
    async (req, _reply) => {
      const { id } = req.params;

      req.log.info(JSON.stringify({ id }));

      // TODO: Delete book from database
      // await bookService.delete(id);

      return { status: 'success' };
    },
  );
};

export default routes;
