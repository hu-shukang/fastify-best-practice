import { ColumnType } from 'kysely';

export interface BookTbl {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: ColumnType<Date, Date | null, never>;
  updatedAt: ColumnType<Date | null, Date | null, Date>;
}
