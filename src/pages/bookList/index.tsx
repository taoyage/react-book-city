import React from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { NavBar, Grid, Space, ErrorBlock } from '@taoyage/react-mobile-ui';

import { BookCover, Loading } from '@/components';

import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const BookList: React.FC = React.memo(() => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const pageIndex = searchParams.get('pageIndex') || 1;
  // const { data, error } = useBookList(pathname, pageIndex);

  // if (error) {
  //   return <ErrorBlock />;
  // }

  // if (!data) {
  //   return <Loading />;
  // }

  return (
    <div className={styles.bookList}>
      <NavBar>标题</NavBar>
      <div className={styles.content}>
        {/* <InfiniteScroll hasMore={true}>
          <Grid columns={1} gap={px2rem(24)}>
            {data.bookList.map((book) => (
              <Grid.Item key={book.bookId} onClick={() => navigate(`/book/${book.bookId}`)}>
                <Space gap={px2rem(12)}>
                  <BookCover src={book.coverImg} alt={book.title} />
                  <Space direction="vertical" justify="between" gap={px2rem(12)}>
                    <div className={styles.bookName}>{book.title}</div>
                    <div className={styles.desc}>{book.desc}</div>
                    <div className={styles.meta}>
                      {book.author}·{book.categoryName}
                    </div>
                  </Space>
                </Space>
              </Grid.Item>
            ))}
          </Grid>
        </InfiniteScroll> */}
      </div>
    </div>
  );
});

export default BookList;
