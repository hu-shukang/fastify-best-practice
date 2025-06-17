import { z } from 'zod';

import { SCHEMA } from '@/utils/const.util';

// ===================================
// User Query Parameters Schema
// ===================================
export const userQuerySchema = z
  .object({
    id: SCHEMA.z.user.id.optional(),
    username: SCHEMA.z.user.username.optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).some((key) => data[key as keyof typeof data] !== undefined);
    },
    {
      message: '一つ以上のフィールドを提供する必要があります',
    },
  );

export type UserQueryInput = z.infer<typeof userQuerySchema>;

// ===================================
// User ID Parameters Schema
// ===================================
export const userIdSchema = z.object({
  id: SCHEMA.z.user.id,
});

export type UserIdInput = z.infer<typeof userIdSchema>;

// ===================================
// User Create Body Schema
// ===================================

export const userCreateInputSchema = z.object({
  username: SCHEMA.z.user.username,
  address: SCHEMA.z.user.address,
  birthday: SCHEMA.z.user.birthday,
  email: SCHEMA.z.user.email,
});

export type UserCreateInput = z.infer<typeof userCreateInputSchema>;

// ===================================
// User Create Response Schema
// ===================================

export const userCreateResponseSchema = z.object({
  id: SCHEMA.z.user.id,
});

export type UserCreateResponse = z.infer<typeof userCreateResponseSchema>;

// ===================================
// User Get Response Schema
// ===================================

export const userGetResponseSchema = z.object({
  id: SCHEMA.z.user.id,
  username: SCHEMA.z.user.username,
  address: SCHEMA.z.user.address,
  birthday: SCHEMA.z.user.birthday,
  email: SCHEMA.z.user.email,
  createdAt: SCHEMA.z.common.createdAt,
  updatedAt: SCHEMA.z.common.updatedAt.nullable(),
});

export type UserGetResponse = z.infer<typeof userGetResponseSchema>;

// ===================================
// User Query Response Schema
// ===================================

export const userQueryResponseSchema = z.array(userGetResponseSchema);

export type UserQuerytResponse = z.infer<typeof userQueryResponseSchema>;
