import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Space } from '@taoyage/react-mobile-ui';

import { BookCover } from '@/components';

import { IBookInfo } from '@/types/book';
import { getShelfList } from '@/utils/shelf';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const List: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const [list, _] = React.useState<IBookInfo[]>(getShelfList());

  const renderContent = () => {
    return list.map((book) => (
      <React.Fragment key={book.bookId}>
        <Grid.Item onClick={() => navigate(`/book/${book.bookId}`)}>
          <BookCover src={book.coverImg} alt={book.title} style={{ '--width': px2rem(74), '--height': px2rem(100) }} />
          <Space direction="vertical" gap={px2rem(6)}>
            <div className={styles.bookName}>{book.title}</div>
            <div className={styles.author}>{book.author}</div>
          </Space>
        </Grid.Item>
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.list}>
      <Grid columns={4} gap={px2rem(16)}>
        {renderContent()}
      </Grid>
    </div>
  );
});

export default List;
