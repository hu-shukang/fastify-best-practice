import { BookTbl } from './book.type';
import { UserTbl } from './user.type';

export interface Database {
  userTbl: UserTbl;
  bookTbl: BookTbl;
}
