import supertest from 'supertest';

import { UserEntity } from '@/entities/user.entity';
import { setupFastify } from '@/tests/helpers/fastify.helper';

describe('GET /user/_id Endpoint', () => {
  const { getApp } = setupFastify();
  let mockedUserFindOneBy: jest.SpyInstance;
  const mockUUID = crypto.randomUUID();

  beforeEach(() => {
    mockedUserFindOneBy = jest.spyOn(UserEntity, 'findOneBy');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('正常', () => {
    it('成功的なリクエスト', async () => {
      const app = getApp();
      const mockUser = { id: mockUUID, username: 'Alice', email: 'alice@example.com' };
      mockedUserFindOneBy.mockResolvedValue(mockUser);

      await supertest(app.server).get(`/user/${mockUUID}`).expect(200).expect(mockUser);
      expect(mockedUserFindOneBy).toHaveBeenCalledTimes(1);
      expect(mockedUserFindOneBy).toHaveBeenCalledWith({ id: mockUUID });
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
      expect(mockedUserFindOneBy).toHaveBeenCalledTimes(0);
    });
  });
});
