import { AsyncLocalStorage } from 'async_hooks';
import { FastifyBaseLogger } from 'fastify';

import { StoreInitFailedError } from '@/models/error.model';

export type IAsyncStore = {
  logger: FastifyBaseLogger;
};

const asyncStore = new AsyncLocalStorage<IAsyncStore>();

const getLogger = () => {
  const store = asyncStore.getStore();
  if (!store) {
    throw new StoreInitFailedError();
  }
  return store.logger;
};

export const ALS = {
  asyncStore: asyncStore,
  getLogger: getLogger,
};
