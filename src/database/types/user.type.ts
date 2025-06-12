import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface UserTbl {
  id: string;
  username: string;
  address: string;
  email: string;
  birthday: ColumnType<Date, Date | string, Date | string>;
  createdAt: ColumnType<Date, Date | null, never>;
  updatedAt: ColumnType<Date | null, Date | null, Date>;
  deleteAt: ColumnType<Date | null, never, Date | null>;
}

export type User = Selectable<UserTbl>;
export type UserCreateInput = Insertable<UserTbl>;
export type UserUpdateInput = Updateable<UserTbl>;
