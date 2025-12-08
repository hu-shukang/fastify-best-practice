import { Insertable, Kysely } from 'kysely';

import { Database } from '@/database/types';
import { BookTbl } from '@/database/types/book.type';
import { BookQueryInput } from '@/models/book.model';

export function deleteBook(bookId: string) {
  return (db: Kysely<Database>) => {
    return db.deleteFrom('bookTbl').where('id', '=', bookId).executeTakeFirst();
  };
}

export function getBook(bookId: string) {
  return (db: Kysely<Database>) => {
    return db.selectFrom('bookTbl').where('id', '=', bookId).selectAll().executeTakeFirstOrThrow();
  };
}

export function addBook(book: Insertable<BookTbl>) {
  return (db: Kysely<Database>) => {
    return db.insertInto('bookTbl').values(book).executeTakeFirst();
  };
}

export function queryBooks(condition: BookQueryInput) {
  return async (db: Kysely<Database>) => {
    const { id, username, title } = condition;
    let query = db
      .selectFrom('bookTbl as b')
      .innerJoin('userTbl as u', 'b.userId', 'u.id')
      .select(['b.id', 'b.title', 'u.username', 'u.id as userId', 'b.createdAt', 'b.updatedAt']);
    if (id) {
      query = query.where('b.id', '=', id);
    }
    if (title) {
      query = query.where('b.title', 'like', `%${title}%`);
    }
    if (username) {
      query = query.where('u.username', 'like', `%${username}%`);
    }
    return await query.execute();
  };
}
