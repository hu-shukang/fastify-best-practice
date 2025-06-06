import { logger } from '@/utils/logger.util';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

const errorHandlerPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.setErrorHandler((error, _request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.status(400).send({
        error: 'Response Validation Error',
        message: "Request doesn't match the schema",
        details: error.validation,
      });
    }

    logger.error(error);

    reply.status(error.statusCode || 500).send({
      status: 'error',
      message: error.message,
    });
  });
});

export default errorHandlerPlugin;
