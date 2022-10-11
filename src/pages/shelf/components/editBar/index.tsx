import React from 'react';
import { Popup } from '@taoyage/react-mobile-ui';

import { useAppSelector } from '@/store';

import styles from './index.module.scss';

const EditBar: React.FC = React.memo(() => {
  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);

  return (
    <Popup visible={editMode} position="bottom" mask={false}>
      <div className={styles.editBar}>
        <div>分组至</div>
        <div>删除(3)</div>
      </div>
    </Popup>
  );
});

export default EditBar;
