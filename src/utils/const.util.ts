import { z } from 'zod';

export const SCHEMA = {
  swagger: {
    routePrefix: '/doc',
  },
  tags: {
    user: {
      name: 'user',
      description: 'ユーザAPI',
    },
  },
  z: {
    user: {
      id: z
        .string({ message: 'ユーザIDは文字列である必要があります' })
        .uuid({ message: 'ユーザIDはUUIDである必要があります' })
        .describe('ユーザID'),
      username: z.string({ message: 'ユーザ名は文字列である必要があります' }).describe('ユーザ名'),
      email: z
        .string({ message: 'メールアドレスは文字列である必要があります' })
        .email({ message: 'メールアドレスはメールアドレスの形式である必要があります' })
        .describe('メールアドレス'),
      birthday: z
        .string({ message: '誕生日は文字列である必要があります' })
        .datetime({ message: '誕生日はISO 8601形式の日時である必要があります' })
        .describe('誕生日'),
      address: z.string({ message: '住所は文字列である必要があります' }).describe('住所'),
    },
  },
} as const;
