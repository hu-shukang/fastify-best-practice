import supertest from 'supertest';

import { setupFastify } from '@/tests/helpers/fastify.helper';

describe('GET /user Endpoint', () => {
  const { getApp } = setupFastify();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('正常', () => {
    it('成功的なリクエスト', async () => {
      const app = getApp();

      const { body } = await supertest(app.server).get('/user').query({ username: 'user' }).expect(200);
      expect(body).toHaveLength(3);
      expect(body[0].username).toBe('user1');
      expect(body[1].username).toBe('user2');
      expect(body[2].username).toBe('user3');
    });
  });

  describe('異常', () => {
    it('Query文字列が空の場合', async () => {
      const app = getApp();

      await supertest(app.server)
        .get('/user')
        .expect(400)
        .expect({
          error: 'Validation Error',
          details: [{ message: '一つ以上のフィールドを提供する必要があります', path: '/' }],
        });
    });

    it('Query文字列に無効な値が含まれている場合', async () => {
      const app = getApp();

      await supertest(app.server)
        .get('/user')
        .query({ id: 'invalid-id' })
        .expect(400)
        .expect({
          error: 'Validation Error',
          details: [{ message: 'ユーザIDはUUIDである必要があります', path: '/id' }],
        });
    });
  });
});
