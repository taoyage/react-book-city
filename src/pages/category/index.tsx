import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, ErrorBlock, Grid, Space } from '@taoyage/react-mobile-ui';

import { ICategory } from '@/pages/category/types';
import { BookCover, Loading } from '@/components';
import { useRequest } from '@/hooks/useRequest';

import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const Category: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { data, error } = useRequest<ICategory[]>({ url: '/api/v1/category' });

  const onBack = React.useCallback(() => {
    navigate(-1);
  }, []);

  const onCategoryItem = React.useCallback((key: string) => {
    navigate(`/book-list/${key}`);
  }, []);

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.category}>
      <NavBar onBack={onBack}>分类</NavBar>
      <div className={styles.categoryContent}>
        <Grid columns={2} gap={16}>
          {data?.map((category) => (
            <Grid.Item span={1} key={category.id} onClick={() => onCategoryItem(category.id)}>
              <div className={styles.categoryItem}>
                <Space gap={px2rem(12)}>
                  <div className={styles.bookCover}>
                    <BookCover
                      src={category.bookCover}
                      alt={category.name}
                      style={{ '--height': px2rem(51), '--width': px2rem(40) }}
                    />
                  </div>
                  <Space direction="vertical">
                    <div className={styles.name}>{category.name}</div>
                    <div className={styles.count}>{category.bookCount}本书</div>
                  </Space>
                </Space>
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </div>
    </div>
  );
});

export default Category;
