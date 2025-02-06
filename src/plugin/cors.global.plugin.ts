import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import cors from '@fastify/cors';

const corsPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'it') {
  // use this if you want to enable cors only in development
  // }

  fastify.register(cors, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
});

export default corsPlugin;
