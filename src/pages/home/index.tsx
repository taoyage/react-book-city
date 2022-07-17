import React from 'react';
import { Swiper, Image, ErrorBlock } from '@taoyage/react-mobile-ui';

import { Loading } from '@/components';

import Header from '@/pages/home/components/header';
import Navbar from '@/pages/home/components/navbar';

import LimitedRead from '@/pages/home/components/limitedRead';
import Popular from '@/pages/home/components/popular';
import Ranking from '@/pages/home/components/ranking';
import Recommend from '@/pages/home/components/recommend';

import { useHomeData } from '@/pages/home/useRequest';

import styles from './index.module.scss';

const Home: React.FC = React.memo(() => {
  const { data, error } = useHomeData();

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <Header />
        <Swiper autoplay>
          {data.banner.map((item, index) => (
            <Swiper.Item key={index}>
              <Image src={item.src} alt={item.alt} />
            </Swiper.Item>
          ))}
        </Swiper>
        <Navbar />
      </div>

      <div className={styles.content}>
        <Popular />
        <Recommend />
        <LimitedRead />
        <Ranking />
      </div>
    </div>
  );
});

export default Home;
