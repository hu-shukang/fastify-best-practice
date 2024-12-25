import { DBCommon, dbCommonDesc, DBCommonType } from './common.model';

export type Book = {
  id: string;
  title: string;
  content: string;
} & DBCommon;

export const bookDesc = {
  id: '書籍ID',
  title: '書籍のタイトル',
  content: '書籍の内容',
  ...dbCommonDesc,
};

export type BookInput = Omit<Book, 'id' | DBCommonType>;
export type BookIdInput = Pick<Book, 'id'>;
export type BookQueryInput = Partial<Pick<Book, 'title' | 'content'>>;
