import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@taoyage/react-mobile-ui';

import styles from './index.module.scss';

const Ranking: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const onBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.ranking}>
      <NavBar onBack={onBack} />
      <div className={styles.content}>content</div>
    </div>
  );
});

export default Ranking;
