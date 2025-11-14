import { Insertable, Kysely } from 'kysely';

import { Database } from '@/database/types';
import { User } from '@/database/types/user.type';
import { UserQueryInput } from '@/models/user.model';

export function deleteUser(id: string) {
  return (db: Kysely<Database>) => {
    return db.deleteFrom('userTbl').where('id', '=', id).executeTakeFirst();
  };
}

export function addUser(user: Insertable<User>) {
  return async (db: Kysely<Database>) => {
    return await db.insertInto('userTbl').values(user).executeTakeFirst();
  };
}

export function queryUser(condition: UserQueryInput) {
  return async (db: Kysely<Database>) => {
    const { id, username } = condition;
    let query = db.selectFrom('userTbl');
    if (id) {
      query = query.where('id', '=', id);
    }
    if (username) {
      query = query.where('username', 'like', `%${username}%`);
    }
    query = query.orderBy('createdAt', 'desc');
    return await query.selectAll().execute();
  };
}

export function getUser(id: string) {
  return async (db: Kysely<Database>) => {
    return await db.selectFrom('userTbl as u').selectAll('u').where('u.id', '=', id).executeTakeFirstOrThrow();
  };
}
