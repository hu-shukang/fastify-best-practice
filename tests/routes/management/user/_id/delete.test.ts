import supertest from 'supertest';

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

      await app.db
        .insertInto('userTbl')
        .values({
          id: userId,
          username: 'test',
          email: 'test@example.com',
          address: '123 Test St',
          birthday: new Date('2000-01-01T00:00:00Z'),
        })
        .execute();

      await supertest(app.server).delete(`/management/user/${userId}`).expect(204);

      const user = await app.db.selectFrom('userTbl').selectAll().where('id', '=', userId).executeTakeFirst();
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
