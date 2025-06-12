import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface BookTbl {
  id: ColumnType<string, string, never>;
  title: string;
  content: string;
  userId: string;
  createdAt: ColumnType<Date, Date | null, never>;
  updatedAt: ColumnType<Date | null, Date | null, Date>;
}

export type Book = Selectable<BookTbl>;
export type BookSummary = Pick<BookTbl, 'id' | 'title' | 'createdAt'>;
export type BookCreateInput = Insertable<BookTbl>;
export type BookUpdateInput = Updateable<BookTbl>;
