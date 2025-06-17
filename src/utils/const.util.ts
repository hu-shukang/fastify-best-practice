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
    book: {
      name: 'book',
      description: '書籍API',
    },
    management: {
      name: 'management',
      description: '管理API',
    },
  },
  z: {
    common: {
      createdAt: z.string().datetime().describe('作成日時'),
      updatedAt: z.string().datetime().describe('更新日時'),
      error: z.string().describe('エラー'),
      message: z.string().describe('メッセージ'),
      path: z.string().describe('パス'),
      success: z.literal('OK').describe('成功'),
    },
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
    book: {
      id: z
        .string({ message: '書籍IDは文字列である必要があります' })
        .uuid({ message: '書籍IDはUUIDである必要があります' })
        .describe('書籍ID'),
      title: z.string({ message: '書籍名は文字列である必要があります' }).describe('書籍名'),
      content: z.string({ message: '書籍内容は文字列である必要があります' }).describe('書籍内容'),
    },
  },
} as const;

export const RESPONSE = {
  success: { success: 'OK' },
} as const;
