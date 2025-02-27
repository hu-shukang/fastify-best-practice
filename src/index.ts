import autoLoad from '@fastify/autoload';
import dotenv from 'dotenv';
import fastify, { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import path from 'path';

declare module 'fastify' {
  interface FastifyContextConfig {
    logPrefix?: string;
  }
  interface FastifyInstance {
    verifyAdmin: (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => void;
    verifySemiAdmin: (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => void;
  }
}

if (process.env.NODE_ENV === 'local') {
  dotenv.config();
}

const server = fastify({
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
  matchFilter: (path) => path.includes('global.plugin'),
});

server.register(autoLoad, {
  dir: path.join(__dirname, 'controller'),
  routeParams: true,
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
