import { requestContext } from '@fastify/request-context';
import { FastifyBaseLogger } from 'fastify';

const getLogger = (): FastifyBaseLogger => requestContext.get('logger') ?? (console as unknown as FastifyBaseLogger);

export const logger: Pick<FastifyBaseLogger, 'info' | 'error' | 'warn' | 'debug'> = {
  get info() {
    const log = getLogger();
    return log.info.bind(log);
  },
  get error() {
    const log = getLogger();
    return log.error.bind(log);
  },
  get warn() {
    const log = getLogger();
    return log.warn.bind(log);
  },
  get debug() {
    const log = getLogger();
    return log.debug.bind(log);
  },
};
