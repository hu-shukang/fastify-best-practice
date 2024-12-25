import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const swaggerPlugin: FastifyPluginAsync = fp(async (fastify) => {
  if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'it') {
    await fastify.register(fastifySwagger, {
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'プロジェクト名 API Swagger',
          description: 'The Fastify swagger プロジェクト名 API',
          version: '0.1.0',
        },
        servers: [
          {
            url: 'http://127.0.0.1:8080',
            description: 'Development server',
          },
        ],
        // APIのカテゴリーごとにタグを設定
        tags: [{ name: 'book', description: 'Book related end-points' }],
      },
    });

    await fastify.register(fastifySwaggerUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (_request, _reply, next) {
          next();
        },
        preHandler: function (_request, _reply, next) {
          next();
        },
      },
      staticCSP: true,
      transformStaticCSP: (header) => {
        return header
          .replace("style-src 'self'", "style-src 'self' 'unsafe-inline'")
          .replace("default-src 'self'", "default-src 'self' http://127.0.0.1:8080");
      },
      transformSpecification: (swaggerObject, _request, _reply) => {
        return swaggerObject;
      },
      transformSpecificationClone: true,
    });
  }
});

export default swaggerPlugin;
