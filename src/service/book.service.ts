import { BookInput } from '@/model/book.model';
import { CommonService } from './common.service';
import { getId } from '@/util/string.util';
import { getUTC } from '@/util/date.util';

export class BookService extends CommonService {
  public async add(bookInput: BookInput) {
    const id = getId();
    const createdAt = getUTC();
    // TODO: Add book to database
    this.logger.info(`Book added: ${JSON.stringify({ ...bookInput, id, createdAt })}`);
    return id;
  }
}
