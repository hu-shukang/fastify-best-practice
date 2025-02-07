import { bookDesc, BookQueryInput } from '@/model/book.model';
import { logger } from '@/util/logger.util';
import { prisma } from '@/util/prisma.util';
import { JSONSchemaType } from 'ajv';
import { FastifyInstance } from 'fastify';
import { FastifySchema } from 'fastify';

const querystringSchema: JSONSchemaType<BookQueryInput> = {
  type: 'object',
  properties: {
    title: { type: 'string', maxLength: 50, nullable: true, description: bookDesc.title },
    content: { type: 'string', maxLength: 10000, nullable: true, description: bookDesc.content },
  },
  additionalProperties: false,
};

export const schema: FastifySchema = {
  summary: '書籍検索',
  description: '書籍を検索します。',
  tags: ['book'],
  querystring: querystringSchema,
  response: {
    200: {
      description: '成功',
      type: 'object',
      properties: {
        status: { type: 'string', const: 'success' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: bookDesc.id },
              title: { type: 'string', description: bookDesc.title },
              createdAt: { type: 'string', description: bookDesc.createdAt },
              updatedAt: { type: 'string', description: bookDesc.updatedAt },
            },
          },
        },
      },
    },
  },
};

const routes = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: BookQueryInput }>(
    '/',
    {
      schema: schema,
      config: {
        logPrefix: '書籍検索',
      },
    },
    async (req, _reply) => {
      const { title, content } = req.query;

      const books = await prisma.book.findMany({
        select: { id: true, title: true, createdAt: true, updatedAt: true },
        where: {
          title: { contains: title },
          content: { contains: content },
        },
        orderBy: { createdAt: 'desc' },
      });

      return {
        status: 'success',
        data: books,
      };
    },
  );
};

export default routes;
