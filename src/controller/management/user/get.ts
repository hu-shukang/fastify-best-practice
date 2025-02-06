import { userDesc, UserQueryInput } from '@/model/user.model';
import { logger } from '@/util/logger.util';
import { JSONSchemaType } from 'ajv';
import { FastifyInstance } from 'fastify';
import { FastifySchema } from 'fastify';

const querystringSchema: JSONSchemaType<UserQueryInput> = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 50, nullable: true, description: userDesc.name },
    address: { type: 'string', maxLength: 100, nullable: true, description: userDesc.address },
  },
  additionalProperties: false,
};

export const schema: FastifySchema = {
  summary: 'ユーザ検索',
  description: 'ユーザを検索します。',
  tags: ['ユーザ管理'],
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
              id: { type: 'string', description: userDesc.id },
              name: { type: 'string', description: userDesc.name },
              address: { type: 'string', description: userDesc.address },
              createdAt: { type: 'string', description: userDesc.createdAt },
              updatedAt: { type: 'string', description: userDesc.updatedAt },
            },
          },
        },
      },
    },
  },
};

const routes = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: UserQueryInput }>(
    '/',
    {
      schema: schema,
      config: {
        logPrefix: 'ユーザ検索',
      },
      preHandler: fastify.auth([fastify.verifyAdmin]),
    },
    async (req, _reply) => {
      const { name, address } = req.query;

      logger.info(`ユーザ検索: name=${name}, address=${address}`);

      return {
        status: 'success',
        data: [
          {
            id: 'xx',
            name: 'xx',
            address: 'xx',
            createdAt: 'xx',
            updatedAt: 'xx',
          },
        ],
      };
    },
  );
};

export default routes;
