import { requestContext } from '@fastify/request-context';
import { FastifyBaseLogger } from 'fastify';

const getLogger = (): FastifyBaseLogger => requestContext.get('logger') ?? (console as unknown as FastifyBaseLogger);

export const logger: Pick<FastifyBaseLogger, 'info' | 'error' | 'warn' | 'debug'> = {
  get info() {
    const logger = getLogger();
    return logger.info.bind(logger);
  },
  get error() {
    const logger = getLogger();
    return logger.error.bind(logger);
  },
  get warn() {
    const logger = getLogger();
    return logger.warn.bind(logger);
  },
  get debug() {
    const logger = getLogger();
    return logger.debug.bind(logger);
  },
};
