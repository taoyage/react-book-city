import React from 'react';
import { Swiper, Image, ErrorBlock, Space, PullToRefresh } from '@taoyage/react-mobile-ui';

import { Loading } from '@/components';
import Header from '@/pages/home/components/header';
import Navbar from '@/pages/home/components/navbar';
import LimitedRead from '@/pages/home/components/limitedRead';
import Popular from '@/pages/home/components/popular';
import Ranking from '@/pages/home/components/ranking';
import Recommend from '@/pages/home/components/recommend';
import { IHomeData } from '@/pages/home/types';
import api from '@/pages/home/api';

import useRequest from '@/hooks/useRequest';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const Home: React.FC = React.memo(() => {
  const { data, error, mutate } = useRequest<IHomeData>({ url: api.getHomeData });

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <PullToRefresh onRefresh={mutate}>
      <div className={styles.home}>
        <Space direction="vertical" gap={px2rem(20)}>
          <Header />
          <Swiper autoplay loop={true} style={{ '--border-radius': '12px' }}>
            {data!.banner.map((item, index) => (
              <Swiper.Item key={index}>
                <Image src={item.src} alt={item.alt} />
              </Swiper.Item>
            ))}
          </Swiper>
          <Navbar />
          <Popular />
          <Recommend />
          <LimitedRead />
          <Ranking />
        </Space>
      </div>
    </PullToRefresh>
  );
});

export default Home;
