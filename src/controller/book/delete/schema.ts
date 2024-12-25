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
  description: '書籍削除',
  tags: ['book'],
  summary: '書籍を削除します。',
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
