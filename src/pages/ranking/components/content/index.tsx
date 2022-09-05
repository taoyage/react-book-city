import React from 'react';
import { Sidebar } from '@taoyage/react-mobile-ui';

import BookList from '@/pages/ranking/components/booklist';

import { useAppSelector, AppState, useAppDispatch } from '@/store';
import { useRequest } from '@/hooks/useRequest';

import { TAB_DEFAULT_KEY } from '@/pages/ranking/constants';
import { IRanking } from '@/pages/ranking/types';
import api from '@/pages/ranking/api';

import styles from './index.module.scss';

const RankingContent: React.FC = React.memo((props) => {
  const { data } = useRequest<IRanking>({ url: api.ranking });
  const selectedTabKey = useAppSelector<'male' | 'female'>((state: AppState) => state.ranking.activeTabKey);
  const [activeKey, setActiveKey] = React.useState<string>(data![TAB_DEFAULT_KEY][0].key);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.rankingContent}>
      <Sidebar activeKey={activeKey} onChange={onChange}>
        {data![selectedTabKey].map((item) => (
          <Sidebar.Item key={item.key} title={item.shortTitle}>
            {item.key === activeKey && <BookList gender={selectedTabKey} id={item.key} />}
          </Sidebar.Item>
        ))}
      </Sidebar>
    </div>
  );
});

export default RankingContent;
