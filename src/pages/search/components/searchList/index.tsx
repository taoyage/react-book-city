import React from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { ErrorBlock, Grid, Space } from '@taoyage/react-mobile-ui';

import api from '@/pages/search/api';

import { Loading, BookCover } from '@/components';
import { useRequest } from '@/hooks/useRequest';
import { IBookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';
import { useAppSelector } from '@/store';

import styles from './index.module.scss';

const SearchList: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const searchKeyword = useAppSelector<string>((state) => state.search.searchKeyword);
  const searchMode = useAppSelector<boolean>((state) => state.search.searchMode);

  const { data, error, mutate } = useRequest<IBookInfo[]>({
    url: api.getSearchList,
    params: { keyword: searchKeyword },
  });

  // todo: update
  React.useEffect(() => {
    if (searchKeyword) {
      mutate();
    }
  }, [mutate, searchKeyword]);

  if (error && searchMode) {
    return <ErrorBlock />;
  }

  if (!data && searchMode) {
    return <Loading />;
  }

  return (
    <div className={cx(styles.searchList, { [styles.hidden]: !searchMode })}>
      <Grid columns={1} gap={px2rem(24)}>
        {data?.map((book) => (
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
    </div>
  );
});

export default SearchList;
