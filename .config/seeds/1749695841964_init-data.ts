import type { Kysely } from 'kysely';

import type { Database } from '@/database/types';

export async function seed(db: Kysely<Database>): Promise<void> {
  const user1Id = '123e4567-e89b-12d3-a456-426614174000'; // Example UUID for user1
  const user2Id = '123e4567-e89b-12d3-a456-426614174001'; // Example UUID for user2
  const user3Id = '123e4567-e89b-12d3-a456-426614174002'; // Example UUID for user3

  const book1Id = '123e4567-e89b-12d3-a456-426614174100'; // Example UUID for book1
  const book2Id = '123e4567-e89b-12d3-a456-426614174101'; // Example UUID for book2
  const book3Id = '123e4567-e89b-12d3-a456-426614174102'; // Example UUID for book3

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

  await db
    .insertInto('bookTbl')
    .values([
      {
        id: book1Id, // Example UUID for book1
        title: 'Book One',
        content: 'Content of Book One',
        userId: user1Id, // Linking to user1
      },
      {
        id: book2Id, // Example UUID for book2
        title: 'Book Two',
        content: 'Content of Book Two',
        userId: user1Id, // Linking to user1
      },
      {
        id: book3Id, // Example UUID for book3
        title: 'Book Three',
        content: 'Content of Book Three',
        userId: user2Id, // Linking to user2
      },
    ])
    .execute();
}
