import server from '@/index';

describe('book add api', () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('fail', () => {
    it('schema fail', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/book',
        body: {
          title: 1,
        },
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('success', () => {
    it('add book', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/book',
        body: {
          title: 'test',
          content: 'content',
        },
      });
      expect(response.statusCode).toBe(200);
      const result = response.json();
      expect(result).toHaveProperty('status', 'success');
      expect(result.data).toHaveProperty('id');
    });
  });
});
