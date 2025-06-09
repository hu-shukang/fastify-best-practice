import fastifyEnv from '@fastify/env';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const envPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(fastifyEnv, {
    confKey: 'config',
    schema: {
      type: 'object',
      required: ['NODE_ENV', 'PORT', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'],
      additionalProperties: false,
      properties: {
        NODE_ENV: { type: 'string', enum: ['dev', 'it', 'prod'] },
        PORT: { type: 'number', default: 8080 },
        DB_HOST: { type: 'string' },
        DB_USER: { type: 'string' },
        DB_PASSWORD: { type: 'string' },
        DB_NAME: { type: 'string' },
      },
    },
  });
});

export default envPlugin;
