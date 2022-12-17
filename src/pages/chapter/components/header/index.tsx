import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Popup, Space } from '@taoyage/react-mobile-ui';

import { useAppSelector } from '@/store';

import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const ChapterHeader: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);

  const onGoHome = () => {
    navigate('/');
  };

  const onBack = () => {
    navigate(-1);
  };

  const onShelf = () => {};

  const rightRender = () => {
    return (
      <div className={styles.icons}>
        <Space justify="end" gap={px2rem(20)}>
          <i className="icon-home" onClick={onGoHome} />
          <i className="icon-shelf" onClick={onShelf} />
        </Space>
      </div>
    );
  };

  return (
    <div className={styles.header}>
      <Popup position="top" visible={headerVisible} mask={false}>
        <NavBar right={rightRender()} onBack={onBack} />
      </Popup>
    </div>
  );
});

export default ChapterHeader;
