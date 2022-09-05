import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Tabs } from '@taoyage/react-mobile-ui';

import { useAppSelector, useAppDispatch } from '@/store';

import { rankingActions } from '@/pages/ranking/store';
import { TABS } from '@/pages/ranking/constants';

const RankingHeader: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedTabKey = useAppSelector<string>((state) => state.ranking.activeTabKey);

  const onBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onTab = React.useCallback(
    (key: string) => {
      dispatch(rankingActions.setTabKey(key));
    },
    [dispatch]
  );

  return (
    <NavBar onBack={onBack}>
      <Tabs activeKey={selectedTabKey} onChange={onTab}>
        {TABS.map((item) => (
          <Tabs.Tab key={item.key} title={item.name} />
        ))}
      </Tabs>
    </NavBar>
  );
});

export default RankingHeader;
