import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Grid, Space } from '@taoyage/react-mobile-ui';

import { BookCover } from '@/components';
import useRequest from '@/hooks/useRequest/useRequest';
import { px2rem } from '@/utils/unit';

import api from '@/pages/home/api';
import { IHomeData } from '@/pages/home/types';

import styles from './index.module.scss';

const Recommend: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { data } = useRequest<IHomeData>({ url: api.getHomeData });

  const renderContent = React.useMemo(() => {
    return data?.recommend.map((book) => (
      <React.Fragment key={book.bookId}>
        <Grid.Item onClick={() => navigate(`/book/${book.bookId}`)}>
          <BookCover src={book.coverImg} alt={book.title} />
          <Space direction="vertical" gap={px2rem(6)}>
            <div className={styles.bookName}>{book.title}</div>
            <div className={styles.author}>{book.author}</div>
          </Space>
        </Grid.Item>
      </React.Fragment>
    ));
  }, [data?.recommend, navigate]);

  const onHeaderClick = React.useCallback(() => {
    navigate('/recommend');
  }, [navigate]);

  return (
    <div className={styles.recommend}>
      <Card
        title="今日推荐"
        extra="更多"
        titleClassName={styles.title}
        headerClassName={styles.header}
        onHeaderClick={onHeaderClick}
      >
        <Grid columns={4} gap={px2rem(16)}>
          {renderContent}
        </Grid>
      </Card>
    </div>
  );
});

export default Recommend;
