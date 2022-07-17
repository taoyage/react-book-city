import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Space, Grid } from '@taoyage/react-mobile-ui';

import { BookCover } from '@/components';

import { useHomeData } from '@/pages/home/useRequest';

import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const Popular: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { data } = useHomeData();

  const renderContent = React.useMemo(() => {
    return data?.popular.map((book) => (
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
    ));
  }, [data?.popular, navigate]);

  const onHeaderClick = React.useCallback(() => {
    navigate('/popular');
  }, [navigate]);

  return (
    <div className={styles.popular}>
      <Card title="热门精选" extra="更多" headerClassName={styles.header} onHeaderClick={onHeaderClick}>
        <Grid columns={1} gap={px2rem(24)}>
          {renderContent}
        </Grid>
      </Card>
    </div>
  );
});

export default Popular;