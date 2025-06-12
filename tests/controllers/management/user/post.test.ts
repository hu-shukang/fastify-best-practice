import supertest from 'supertest';

import { db } from '@/database';
import { UserCreateInput } from '@/models/user.model';
import { setupFastify } from '@/tests/helpers/fastify.helper';
import { Str } from '@/utils/string.util';

describe('POST /management/user', () => {
  let mockGetUUID: jest.SpyInstance;
  const mockUUID = crypto.randomUUID();
  const { getApp } = setupFastify();

  beforeEach(() => {
    mockGetUUID = jest.spyOn(Str, 'uuid').mockReturnValue(mockUUID);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('成功', () => {
    it('成功的なリクエスト', async () => {
      const app = getApp();
      const body: UserCreateInput = {
        username: 'Alice',
        address: '123 Main St',
        birthday: new Date('1990-01-01').toISOString(),
        email: 'abc@sample.com',
      };

      await supertest(app.server).post('/management/user').send(body).expect(200).expect({
        id: mockUUID,
      });

      expect(mockGetUUID).toHaveBeenCalledTimes(1);
      const user = await db.selectFrom('userTbl').where('id', '=', mockUUID).selectAll().executeTakeFirst();
      expect(user).toEqual(
        expect.objectContaining({
          id: mockUUID,
        }),
      );
      await db.deleteFrom('userTbl').where('id', '=', mockUUID).execute();
    });
  });

  describe('Validation Error', () => {
    it('不正なリクエスト', async () => {
      const app = getApp();
      const body = {
        birthday: 'invalid-date', // 不正な日付形式
        email: 'invalid-email', // 不正なメールアドレス形式
      };
      await supertest(app.server)
        .post('/management/user')
        .send(body)
        .expect(400)
        .expect({
          error: 'Validation Error',
          details: [
            { message: 'ユーザ名は文字列である必要があります', path: '/username' },
            { message: '住所は文字列である必要があります', path: '/address' },
            { message: '誕生日はISO 8601形式の日時である必要があります', path: '/birthday' },
            { message: 'メールアドレスはメールアドレスの形式である必要があります', path: '/email' },
          ],
        });
      expect(mockGetUUID).toHaveBeenCalledTimes(0);
    });
  });

  describe('Server Error', () => {
    it('ユーザ登録失敗', async () => {
      const app = getApp();
      const body: UserCreateInput = {
        username: 'Alice',
        address: '123 Main St',
        birthday: new Date('1990-01-01').toISOString(),
        email: 'abc@sample.com',
      };
      mockGetUUID.mockReturnValue('123e4567-e89b-12d3-a456-426614174000');

      await supertest(app.server).post('/management/user').send(body).expect(500).expect({
        error: 'error',
        message: '重複したキー値は一意性制約"user_tbl_pkey"違反となります',
      });
      expect(mockGetUUID).toHaveBeenCalledTimes(1);
    });
  });
});
