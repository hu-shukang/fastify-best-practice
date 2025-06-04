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
      message: '请求参数中必须至少提供 id 或 username 中的一个。',
    },
  );

export type UserQueryInput = z.infer<typeof userQuerySchema>;
