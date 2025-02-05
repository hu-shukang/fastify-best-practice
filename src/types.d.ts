import { FastifyBaseLogger, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import '@fastify/request-context';

declare module '@fastify/request-context' {
  interface RequestContextData {
    logger: FastifyBaseLogger;
    reqId: string;
  }
}

declare module 'fastify' {
  interface FastifyContextConfig {
    logPrefix?: string;
  }
  interface FastifyInstance {
    verifyAdmin: (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => void;
    verifySemiAdmin: (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => void;
  }
}
