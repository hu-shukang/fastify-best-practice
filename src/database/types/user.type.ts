import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface UserTbl {
  id: ColumnType<string, string, never>;
  username: string;
  address: string;
  email: string;
  birthday: ColumnType<Date, Date | string, Date | string>;
  createdAt: ColumnType<Date, Date | null, never>;
  updatedAt: ColumnType<Date | null, Date | null, Date>;
}

export type User = Selectable<UserTbl>;
export type UserCreateInput = Insertable<UserTbl>;
export type UserUpdateInput = Updateable<UserTbl>;
