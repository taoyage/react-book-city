import React from 'react';
import { Link } from 'react-router-dom';

import Category from '@/assets/images/category.png';
import Rank from '@/assets/images/rank.png';

import styles from './index.module.scss';

const Navbar: React.FC = React.memo(() => {
  return (
    <div className={styles.navbar}>
      <Link to="/ranking">
        <div className={styles.item}>
          <img className={styles.icon} src={Category} alt="category" width="100%" />
          <h3 className={styles.title}>排行榜</h3>
        </div>
      </Link>

      <div className={styles.item}>
        <Link to="/ranking" className={styles.icon}>
          <img src={Rank} alt="rank" width="100%" />
        </Link>
        <h3 className={styles.title}>分类</h3>
      </div>

      <div className={styles.item}>
        <Link to="/ranking" className={styles.icon}>
          <img src={Category} alt="category" width="100%" />
        </Link>
        <h3 className={styles.title}>完本</h3>
      </div>

      <div className={styles.item}>
        <Link to="/ranking" className={styles.icon}>
          <img src={Rank} alt="rank" width="100%" />
        </Link>
        <h3 className={styles.title}>专题</h3>
      </div>
    </div>
  );
});

export default Navbar;