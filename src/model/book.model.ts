export type Book = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const bookDesc = {
  id: '書籍ID',
  title: '書籍のタイトル',
  content: '書籍の内容',
  createdAt: '作成日時',
  updatedAt: '更新日時',
  deletedAt: '削除日時',
};

export type BookInput = Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type BookIdInput = Pick<Book, 'id'>;
export type BookQueryInput = Partial<Pick<Book, 'title' | 'content'>>;
