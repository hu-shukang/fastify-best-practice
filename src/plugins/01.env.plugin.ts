import fastifyEnv from '@fastify/env';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const envPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(fastifyEnv, {
    confKey: 'config',
    schema: {
      type: 'object',
      required: ['NODE_ENV', 'PORT', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT', 'CORS', 'SWAGGER'],
      additionalProperties: true,
      properties: {
        NODE_ENV: { type: 'string', enum: ['test', 'dev', 'it', 'prod'] },
        PORT: { type: 'number', default: 8080 },
        DB_HOST: { type: 'string' },
        DB_USER: { type: 'string' },
        DB_PASSWORD: { type: 'string' },
        DB_NAME: { type: 'string' },
        DB_PORT: { type: 'number' },
        LOG_LEVEL: { type: 'string', enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'], default: 'info' },
        CORS: { type: 'string', enum: ['ON', 'OFF'] },
        SWAGGER: { type: 'string', enum: ['ON', 'OFF'] },
      },
    },
  });
});

export default envPlugin;
