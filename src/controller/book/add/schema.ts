import { bookDesc, BookInput } from '@/model/book.model';
import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';

const bodySchema: JSONSchemaType<BookInput> = {
  type: 'object',
  properties: {
    title: { type: 'string', maxLength: 50, description: bookDesc.title },
    content: { type: 'string', maxLength: 10000, description: bookDesc.content },
  },
  required: ['title', 'content'],
  additionalProperties: false,
};

export const schema: FastifySchema = {
  description: '書籍追加',
  tags: ['book'],
  summary: '書籍を追加します。',
  body: bodySchema,
  response: {
    200: {
      description: '成功',
      type: 'object',
      properties: {
        status: { type: 'string', const: 'success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', description: bookDesc.id },
          },
        },
      },
    },
  },
};
