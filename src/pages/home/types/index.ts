import { IBookInfo } from '@/types/book';

export interface IRaking {
  id: string;
  title: string;
  books: IBookInfo[];
}

export interface Ibanner {
  src: string;
  alt: string;
}

export interface IHomeData {
  banner: Ibanner[];
  limited: IBookInfo[];
  popular: IBookInfo[];
  ranking: IRaking[];
  recommend: IBookInfo[];
}
