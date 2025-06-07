import { UserEntity } from '@/entities/user.entity';
import { setupFastify } from '@/tests/helpers/fastify.helper';
import supertest from 'supertest';

describe('GET /user Endpoint', () => {
  const { getApp } = setupFastify();
  let mockedUserQueryList: jest.SpyInstance;

  beforeEach(() => {
    mockedUserQueryList = jest.spyOn(UserEntity, 'queryList');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('正常', () => {
    it('成功的なリクエスト', async () => {
      const app = getApp();
      const mockUsers = [
        { id: '1', username: 'Alice', email: 'alice@example.com' },
        { id: '2', username: 'Bob', email: '  bob@example.com' },
      ];
      mockedUserQueryList.mockResolvedValue(mockUsers);

      await supertest(app.server).get('/user').query({ username: 'Alice' }).expect(200).expect(mockUsers);
      expect(mockedUserQueryList).toHaveBeenCalledTimes(1);
      expect(mockedUserQueryList).toHaveBeenCalledWith({ username: 'Alice' });
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
      expect(mockedUserQueryList).toHaveBeenCalledTimes(0);
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
      expect(mockedUserQueryList).toHaveBeenCalledTimes(0);
    });
  });
});
