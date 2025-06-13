import autoLoad from '@fastify/autoload';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { join } from 'path';

export function build(opts?: FastifyServerOptions): FastifyInstance {
  const server = fastify({
    disableRequestLogging: true,
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: process.env.NODE_ENV === 'dev',
          translateTime: 'SYS:standard',
          ignore: 'pid,reqId,hostname,res,responseTime,summary',
          messageFormat: '[{reqId}] [{summary}] - {msg}',
          singleLine: true,
        },
      },
    },
    ...opts,
  });

  // Add schema validator and serializer
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  server.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
    matchFilter: (path) => path.includes('plugin'),
  });

  server.register(autoLoad, {
    dir: join(__dirname, 'hooks'),
    matchFilter: (path) => path.includes('global'),
  });

  server.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    routeParams: true,
    dirNameRoutePrefix: true,
    autoHooks: true,
    cascadeHooks: true,
    overwriteHooks: true,
    autoHooksPattern: /hook/,
  });

  return server;
}
