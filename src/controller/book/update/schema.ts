import { bookDesc, BookIdInput, BookInput } from '@/model/book.model';
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
  summary: '書籍更新',
  description: '書籍を更新します。',
  tags: ['book'],
  params: paramsSchema,
  body: bodySchema,
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
