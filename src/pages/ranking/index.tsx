import React from 'react';
import { ErrorBlock } from '@taoyage/react-mobile-ui';

import { Loading } from '@/components';
import { useReducer } from '@/store';
import { useRequest } from '@/hooks/useRequest';

import RankingHeader from '@/pages/ranking/components/header';
import RankingContent from '@/pages/ranking/components/content';

import { createReducer } from '@/pages/ranking/store';
import api from '@/pages/ranking/api';

import styles from './index.module.scss';

const Ranking: React.FC = React.memo(() => {
  const { data, error } = useRequest({ url: api.ranking });
  const { reducers } = React.useMemo(() => createReducer('ranking'), []);
  useReducer(reducers);

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.ranking}>
      <RankingHeader />
      <RankingContent />
    </div>
  );
});

export default Ranking;
