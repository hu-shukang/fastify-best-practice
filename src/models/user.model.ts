import { SCHEMA } from '@/utils/const.util';
import { z } from 'zod';

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

export const userIdSchema = z.object({
  id: SCHEMA.z.user.id,
});

export type UserIdInput = z.infer<typeof userIdSchema>;
