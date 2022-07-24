import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Countdown, Card, Grid, Space } from '@taoyage/react-mobile-ui';

import { BookCover } from '@/components';
import useRequest from '@/hooks/useRequest';

import { IHomeData } from '@/pages/home/types';
import api from '@/pages/home/api';

import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const LimitedRead: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { data } = useRequest<IHomeData>({ url: api.getHomeData });

  const time = 1000 * 60 * 60 * 30 + 3000;

  const Header = React.useMemo(() => {
    return (
      <div className={styles.headerLeft}>
        <div className={styles.title}>限时免费</div>
        <div className={styles.divider}>|</div>
        <Countdown time={time} format="hh:mm:ss" numberClassName={styles.num} symbolClassName={styles.symbol} />
      </div>
    );
  }, [time]);

  const renderContent = React.useMemo(() => {
    return data?.limited.map((book) => (
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
  }, [data?.limited, navigate]);

  return (
    <div className={styles.limited}>
      <Card title={Header} headerClassName={styles.header}>
        <Grid columns={4} gap={px2rem(16)}>
          {renderContent}
        </Grid>
      </Card>
    </div>
  );
});

export default LimitedRead;
