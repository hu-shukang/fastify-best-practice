import { createError } from '@fastify/error';

export const StoreInitFailedError = createError('500', 'STORE_INIT_FAILED', 500);
