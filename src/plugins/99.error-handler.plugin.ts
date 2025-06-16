import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { NoResultError } from 'kysely';

import { logger } from '@/utils/logger.util';

const errorHandlerPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.setErrorHandler((error, _request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: error.validation.map((issue) => ({
          message: issue.message,
          path: issue.instancePath,
        })),
      });
    }

    if (error instanceof NoResultError) {
      return reply.status(404).send({
        error: 'Not Found',
        message: error.message,
      });
    }

    logger.error(error);

    reply.status(error.statusCode || 500).send({
      error: error.name || 'Internal Server Error',
      message: error.message,
    });
  });
});

export default errorHandlerPlugin;
