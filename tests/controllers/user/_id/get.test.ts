import supertest from 'supertest';

import { setupFastify } from '@/tests/helpers/fastify.helper';

describe('GET /user/_id Endpoint', () => {
  const { getApp } = setupFastify();
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('正常', () => {
    it('成功的なリクエスト', async () => {
      const app = getApp();
      const id = '123e4567-e89b-12d3-a456-426614174000';

      const resp = await supertest(app.server).get(`/user/${id}`).expect(200);
      expect(resp.body.username).toBe('user1');
      expect(resp.body.email).toBe('user1@example.com');
      expect(resp.body.address).toBe('123 Main St');
      expect(resp.body.birthday).toBe(new Date('1990-01-01T00:00:00Z').toISOString());
    });
  });

  describe('異常', () => {
    it('idが不正な値の場合', async () => {
      const app = getApp();
      const invalidUserId = 'invalid-id';
      await supertest(app.server)
        .get(`/user/${invalidUserId}`)
        .expect(400)
        .expect({
          error: 'Validation Error',
          details: [{ message: 'ユーザIDはUUIDである必要があります', path: '/id' }],
        });
    });
  });
});
