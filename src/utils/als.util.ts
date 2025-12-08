import { AsyncLocalStorage } from 'async_hooks';
import { FastifyBaseLogger } from 'fastify';

export type IAsyncStore = {
  logger: FastifyBaseLogger;
};

const asyncStore = new AsyncLocalStorage<IAsyncStore>();

const getLogger = () => {
  const store = asyncStore.getStore();
  if (!store) {
    return console as unknown as FastifyBaseLogger;
  }
  return store.logger;
};

export const ALS = {
  asyncStore: asyncStore,
  getLogger: getLogger,
};
