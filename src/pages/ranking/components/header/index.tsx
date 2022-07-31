import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Tabs } from '@taoyage/react-mobile-ui';

import { useAppSelector, AppState, useAppDispatch } from '@/store';

import { TABS } from '@/pages/ranking/constants';

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedTabKey = useAppSelector<string>((state: AppState) => state.ranking.activeTabKey);

  const onBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  console.log(selectedTabKey);

  const onTab = React.useCallback(
    (key: string) => {
      // dispatch();
    },
    [dispatch]
  );

  return (
    <NavBar onBack={onBack}>
      <Tabs activeKey={selectedTabKey} onChange={onTab}>
        {TABS.map((item) => (
          <Tabs.Tab key={item.key} title={item.name} />
        ))}
        {/* <Tabs.Tab key="1" title="男生" />
        <Tabs.Tab key="2" title="女生" /> */}
      </Tabs>
    </NavBar>
  );
});

export default Header;
