import { IBookInfo } from '@/types/book';

export interface IBookListData {
  bookList: IBookInfo[];
  isLast: boolean;
}

export type TPageKey = 'popular' | 'recommend' | 'finish';

export type TTitleKeyMap = Record<TPageKey, string>;
