import autoLoad from '@fastify/autoload';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { join } from 'path';

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
});

// Add schema validator and serializer
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(autoLoad, {
  dir: join(__dirname, 'plugins'),
  matchFilter: (path) => path.includes('global'),
});

server.register(autoLoad, {
  dir: join(__dirname, 'hooks'),
  matchFilter: (path) => path.includes('global'),
});

server.register(autoLoad, {
  dir: join(__dirname, 'controllers'),
  routeParams: true,
  dirNameRoutePrefix: true,
  autoHooks: true,
  cascadeHooks: true,
  overwriteHooks: true,
  autoHooksPattern: /hook/,
});

server.listen({ host: '0.0.0.0', port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log(server.printRoutes());
});
