import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const errorHandlerPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    const details = {
      error: error,
      ctx: {
        method: request.method,
        url: request.url,
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
      },
    };

    request.log.error(`Error: ${JSON.stringify(details)}`);

    reply.status(error.statusCode || 500).send({
      message: error.message,
      stack: error.stack,
    });
  });
});

export default errorHandlerPlugin;
