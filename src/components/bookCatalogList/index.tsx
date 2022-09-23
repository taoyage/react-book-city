import React from 'react';
import { Link } from 'react-router-dom';
import { Space } from '@taoyage/react-mobile-ui';

import BookCover from '@/components/bookCover';

import styles from './index.module.scss';

interface BookCatalogListProps {
  catalogList: string[];
  imgUrl: string;
  title: string;
  author: string;
}

const BookCatalogList: React.FC<BookCatalogListProps> = React.memo((props) => {
  return (
    <div className={styles.catalogList}>
      <div className={styles.header}>
        <Space>
          <BookCover src={props.imgUrl} alt={props.title} />
          <div className={styles.meta}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.author}>{props.author}</div>
          </div>
        </Space>
      </div>
      <div className={styles.content}>
        {props.catalogList.map((item) => (
          <Link key={item} className={styles.catalogItem} to="/">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
});

export default BookCatalogList;
