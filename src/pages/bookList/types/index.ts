import { IBookInfo } from '@/types/book';

export interface IBookListData {
  bookList: IBookInfo[];
  isLast: boolean;
}
