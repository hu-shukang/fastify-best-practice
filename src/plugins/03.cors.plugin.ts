import cors from '@fastify/cors';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const corsPlugin: FastifyPluginAsync = fp(async (fastify) => {
  if (fastify.config.CORS === 'ON') {
    await fastify.register(cors, {
      logLevel: 'silent',
    });
  }
});

export default corsPlugin;
