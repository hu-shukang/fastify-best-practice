import fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import path from 'path';
import dotenv from 'dotenv';

declare module 'fastify' {
  interface FastifyContextConfig {
    logPrefix?: string;
  }
}

if (process.env.NODE_ENV === 'local') {
  dotenv.config();
}

const server = fastify({
  genReqId: () => `req-${Math.random().toString(36).substring(2, 12)}`,
  disableRequestLogging: true,
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: process.env.NODE_ENV === 'local',
        translateTime: 'SYS:standard',
        ignore: 'pid,reqId,hostname,res,responseTime,logPrefix',
        messageFormat: '[{reqId}] [{logPrefix}] - {msg}',
      },
    },
  },
});

server.register(autoLoad, {
  dir: path.join(__dirname, 'plugin'),
  matchFilter: (path) => path.endsWith('global.plugin.ts'),
});

server.register(autoLoad, {
  dir: path.join(__dirname, 'controller'),
  matchFilter: (path) => path.endsWith('index.ts'),
  dirNameRoutePrefix: false,
});

server.listen({ host: '0.0.0.0', port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log(server.printRoutes());
});

export default server;
