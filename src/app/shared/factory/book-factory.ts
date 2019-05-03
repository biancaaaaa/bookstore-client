import { Book } from '../class/book';

export class BookFactory {

  static empty(): Book {
    return new Book(null, '', '', [], new Date(),0, 1.00, '', 0, [{id: 0, url: '', title: ''}], '');
  }

  /**
   * Turns json into Book
   * @param rawBook
   * @returns {Book}
   */
  static fromObject(rawBook: any): Book {
    return new Book(
      rawBook.id,
      rawBook.isbn,
      rawBook.title,
      rawBook.authors,
      typeof(rawBook.published) === 'string' ?
        new Date(rawBook.published) : rawBook.published,
      rawBook.user_id,
      rawBook.price,
      rawBook.subtitle,
      rawBook.rating,
      rawBook.images,
      rawBook.description,
    );
  }
}
