import { FastifyInstance } from 'fastify';
import supertest from 'supertest';

import { UserEntity } from '@/entities/user.entity';
import { setupFastify } from '@/tests/helpers/fastify.helper';

describe('DELETE /management/user/_id', () => {
  const { getApp } = setupFastify();
  let mockedUserSoftRemove: jest.SpyInstance;
  const mockUUID = crypto.randomUUID();

  beforeEach(() => {
    mockedUserSoftRemove = jest.spyOn(UserEntity, 'softRemove').mockResolvedValue({} as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('成功', () => {
    it('成功的なリクエスト', async () => {
      const app = getApp();
      const userId = mockUUID;

      await supertest(app.server).delete(`/management/user/${userId}`).expect(200);

      expect(mockedUserSoftRemove).toHaveBeenCalledTimes(1);
      expect(mockedUserSoftRemove).toHaveBeenCalledWith(
        UserEntity.create({
          id: mockUUID,
        }),
      );
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
      expect(mockedUserSoftRemove).toHaveBeenCalledTimes(0);
    });
  });
});
