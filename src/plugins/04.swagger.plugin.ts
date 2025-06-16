import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

import { SCHEMA } from '../utils/const.util';

const swaggerPlugin: FastifyPluginAsync = fp(async (fastify) => {
  if (fastify.config.SWAGGER === 'ON') {
    await fastify.register(swagger, {
      transform: jsonSchemaTransform,
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'fastify-best-practice APIs',
          description: 'fastify-best-practiceのAPIドキュメントです',
          version: '0.1.0',
        },
        servers: [
          {
            url: `http://127.0.0.1:${fastify.config.PORT}`,
            description: 'Development server',
          },
        ],
        // APIのカテゴリーごとにタグを設定
        tags: [SCHEMA.tags.user, SCHEMA.tags.book, SCHEMA.tags.management],
      },
    });
    await fastify.register(swaggerUi, {
      routePrefix: SCHEMA.swagger.routePrefix,
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (_request: any, _reply: any, next: any) {
          next();
        },
        preHandler: function (_request: any, _reply: any, next: any) {
          next();
        },
      },
      staticCSP: false,
      transformSpecificationClone: true,
      logLevel: 'silent',
    });
  }
});

export default swaggerPlugin;
