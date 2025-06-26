import supertest from 'supertest';

import { setupFastify } from '@/tests/helpers/fastify.helper';

describe('GET /book Endpoint', () => {
  const { getApp } = setupFastify();
  describe('正常', () => {
    it('IDで取得できる', async () => {
      const app = getApp();
      const bookId = '123e4567-e89b-12d3-a456-426614174100';

      const resp = await supertest(app.server).get('/book').query({ id: bookId }).expect(200);
      expect(resp.body).toHaveLength(1);
      expect(resp.body[0]).toEqual(
        expect.objectContaining({
          id: bookId,
          title: 'Book One',
          userId: '123e4567-e89b-12d3-a456-426614174000',
        }),
      );
    });

    it('Titleで取得できる', async () => {
      const app = getApp();
      const title = 'Book Two';

      const resp = await supertest(app.server).get('/book').query({ title }).expect(200);
      expect(resp.body).toHaveLength(1);
      expect(resp.body[0]).toEqual(
        expect.objectContaining({
          id: '123e4567-e89b-12d3-a456-426614174101',
          title: title,
          userId: '123e4567-e89b-12d3-a456-426614174000',
        }),
      );
    });

    it('Usernameで取得できる', async () => {
      const app = getApp();
      const username = 'user1';

      const resp = await supertest(app.server).get('/book').query({ username }).expect(200);
      expect(resp.body).toHaveLength(2);
      expect(resp.body[0]).toEqual(
        expect.objectContaining({
          id: '123e4567-e89b-12d3-a456-426614174100', // Example UUID for book1
          title: 'Book One',
          userId: '123e4567-e89b-12d3-a456-426614174000', // Linking to user1
        }),
      );
      expect(resp.body[1]).toEqual(
        expect.objectContaining({
          id: '123e4567-e89b-12d3-a456-426614174101', // Example UUID for book2
          title: 'Book Two',
          userId: '123e4567-e89b-12d3-a456-426614174000', // Linking to user1
        }),
      );
    });
  });
});
