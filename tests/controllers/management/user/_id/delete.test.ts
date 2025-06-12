import supertest from 'supertest';

import { db } from '@/database';
import { setupFastify } from '@/tests/helpers/fastify.helper';

describe('DELETE /management/user/_id', () => {
  const { getApp } = setupFastify();
  const mockUUID = crypto.randomUUID();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('成功', () => {
    it('成功的なリクエスト', async () => {
      const app = getApp();
      const userId = mockUUID;

      await db
        .insertInto('user_tbl')
        .values({
          id: userId,
          username: 'testuser',
          email: 'test@example.com',
          address: '123 Test St',
          birthday: new Date('2000-01-01T00:00:00Z'),
          createdAt: new Date(),
        })
        .execute();

      await supertest(app.server).delete(`/management/user/${userId}`).expect(200);

      const user = await db
        .selectFrom('user_tbl')
        .selectAll()
        .where('id', '=', userId)
        .where('deleteAt', 'is', null)
        .executeTakeFirst();
      expect(user).toBeUndefined();
    });
  });

  describe('Validation Error', () => {
    it('不正なリクエスト', async () => {
      const app = getApp();
      const invalidUserId = 'invalid-id';
      await supertest(app.server)
        .delete(`/management/user/${invalidUserId}`)
        .expect(400)
        .expect({
          error: 'Validation Error',
          details: [{ message: 'ユーザIDはUUIDである必要があります', path: '/id' }],
        });
    });
  });
});
