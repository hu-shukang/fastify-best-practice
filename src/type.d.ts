import '@fastify/request-context';
import { FastifyBaseLogger } from 'fastify';

declare module '@fastify/request-context' {
  interface RequestContextData {
    logger: FastifyBaseLogger;
    reqId: string;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      NODE_ENV: 'dev' | 'it' | 'prod';
      PORT: number;
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    };
  }
}
