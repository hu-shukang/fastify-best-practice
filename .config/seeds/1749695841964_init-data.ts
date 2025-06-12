import type { Kysely } from 'kysely';

import type { Database } from '@/database/types';

export async function seed(db: Kysely<Database>): Promise<void> {
  const user1Id = '123e4567-e89b-12d3-a456-426614174000'; // Example UUID for user1
  const user2Id = '123e4567-e89b-12d3-a456-426614174001'; // Example UUID for user2
  const user3Id = '123e4567-e89b-12d3-a456-426614174002'; // Example UUID for user3

  await db
    .insertInto('userTbl')
    .values([
      {
        id: user1Id,
        username: 'user1',
        email: 'user1@example.com',
        address: '123 Main St',
        birthday: new Date('1990-01-01T00:00:00Z'),
      },
      {
        id: user2Id,
        username: 'user2',
        email: 'user2@example.com',
        address: '456 Elm St',
        birthday: new Date('1992-02-02T00:00:00Z'),
      },
      {
        id: user3Id,
        username: 'user3',
        email: 'user3@example.com',
        address: '789 Oak St',
        birthday: new Date('1994-03-03T00:00:00Z'),
      },
    ])
    .execute();
}
