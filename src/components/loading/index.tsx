import React from 'react';
import { SpinnerLoading } from '@taoyage/react-mobile-ui';

import styles from './index.module.scss';

const Loading: React.FC = React.memo(() => {
  return (
    <div className={styles.loading}>
      <SpinnerLoading size={42} />
    </div>
  );
});

export default Loading;