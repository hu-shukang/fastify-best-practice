import '@fastify/request-context';
import { FastifyBaseLogger } from 'fastify';

declare module '@fastify/request-context' {
  interface RequestContextData {
    logger: FastifyBaseLogger;
    reqId: string;
  }
}
