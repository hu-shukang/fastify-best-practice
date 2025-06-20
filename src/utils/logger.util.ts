import { FastifyBaseLogger } from 'fastify';

import { ALS } from './als.util';

export const logger: Pick<FastifyBaseLogger, 'info' | 'error' | 'warn' | 'debug'> = {
  get info() {
    const log = ALS.getLogger();
    return log.info.bind(log);
  },
  get error() {
    const log = ALS.getLogger();
    return log.error.bind(log);
  },
  get warn() {
    const log = ALS.getLogger();
    return log.warn.bind(log);
  },
  get debug() {
    const log = ALS.getLogger();
    return log.debug.bind(log);
  },
};
