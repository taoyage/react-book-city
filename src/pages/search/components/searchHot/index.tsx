import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { Space } from '@taoyage/react-mobile-ui';

import api from '@/pages/search/api';

import useRequest from '@/hooks/useRequest/useRequest';
import { px2rem } from '@/utils/unit';
import { useAppSelector } from '@/store';

import styles from './index.module.scss';

const SearchHot: React.FC = React.memo(() => {
  const searchMode = useAppSelector<boolean>((state) => state.search.searchMode);
  const { data, error } = useRequest<String[]>({ url: api.getHotSearch });

  const onSearch = () => {};

  if (!data || error) {
    return null;
  }

  return (
    <div className={cx(styles.searchHot, { [styles.hidden]: searchMode })}>
      <div className={styles.title}>热门搜索</div>
      <div className={styles.searchTags}>
        <Space wrap gap={[px2rem(20), px2rem(10)]}>
          {data.map((item, index) => (
            <Link key={index} to="/" className={styles.tag} onClick={onSearch}>
              {item}
            </Link>
          ))}
        </Space>
      </div>
    </div>
  );
});

export default SearchHot;
