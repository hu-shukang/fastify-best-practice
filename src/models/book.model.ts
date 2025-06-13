import { z } from 'zod';

import { SCHEMA } from '@/utils/const.util';

// ===================================
// Book Query Parameters Schema
// ===================================
export const bookQuerySchema = z
  .object({
    id: SCHEMA.z.book.id.optional(),
    username: SCHEMA.z.user.username.optional(),
    title: SCHEMA.z.book.title.optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).some((key) => data[key as keyof typeof data] !== undefined);
    },
    {
      message: '一つ以上のフィールドを提供する必要があります',
    },
  );

export type BookQueryInput = z.infer<typeof bookQuerySchema>;

// ===================================
// Book ID Parameters Schema
// ===================================
export const bookIdSchema = z.object({
  id: SCHEMA.z.book.id,
});
