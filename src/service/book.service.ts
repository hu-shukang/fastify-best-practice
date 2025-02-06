import { BookInput } from '@/model/book.model';
import { getId } from '@/util/string.util';
import { getUTC } from '@/util/date.util';
import { logger } from '@/util/logger.util';

const add = async (bookInput: BookInput) => {
  const id = getId();
  const createdAt = getUTC();
  // TODO: Add book to database
  logger.info(`Book added: ${JSON.stringify({ ...bookInput, id, createdAt })}`);
  return id;
};

export const BookService = {
  add,
};
