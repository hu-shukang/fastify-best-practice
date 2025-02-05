// server/utils/async-storage.ts
import { AsyncLocalStorage } from 'async_hooks';
import { FastifyBaseLogger } from 'fastify';

type StorageT = { logger: FastifyBaseLogger; reqId: string };
export const asyncLocalStorage = new AsyncLocalStorage<StorageT>();
