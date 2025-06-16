import { z } from 'zod';

import { SCHEMA } from '@/utils/const.util';

// ===================================
// 400 Response Schema
// ===================================
export const badRequestSchema = z
  .object({
    error: SCHEMA.z.common.error,
    details: z.array(
      z.object({
        path: SCHEMA.z.common.path,
        message: SCHEMA.z.common.message,
      }),
    ),
  })
  .describe('Bad Request');

// ===================================
// 404 Response Schema
// ===================================
export const notFoundSchema = z
  .object({
    error: SCHEMA.z.common.error,
    message: SCHEMA.z.common.message,
  })
  .describe('Not Found');
