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

// ===================================
// Book Create Input Schema
// ===================================
export const bookCreateInputSchema = z.object({
  id: SCHEMA.z.book.id,
  title: SCHEMA.z.book.title,
  content: SCHEMA.z.book.content,
});

export type BookCreateInput = z.infer<typeof bookCreateInputSchema>;

// ===================================
// Book Delete Input Schema
// ===================================
export const bookDeleteInputSchema = z.object({
  id: SCHEMA.z.user.id,
  bookId: SCHEMA.z.book.id,
});

export type BookDeleteInput = z.infer<typeof bookDeleteInputSchema>;

// ===================================
// Book Get Response Schema
// ===================================
export const bookGetResponseSchema = z.object({
  id: SCHEMA.z.book.id,
  title: SCHEMA.z.book.title,
  content: SCHEMA.z.book.content,
  createdAt: SCHEMA.z.common.createdAt,
  updatedAt: SCHEMA.z.common.updatedAt.nullable(),
});

// ===================================
// Book Query Response Schema
// ===================================
export const bookQueryResponseItemSchema = z.object({
  id: SCHEMA.z.book.id,
  title: SCHEMA.z.book.title,
  createdAt: SCHEMA.z.common.createdAt,
  updatedAt: SCHEMA.z.common.updatedAt.nullable(),
  username: SCHEMA.z.user.username,
  userId: SCHEMA.z.user.id,
});

export const bookQueryResponseSchema = z.array(bookQueryResponseItemSchema);
