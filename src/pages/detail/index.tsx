import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBlock } from '@taoyage/react-mobile-ui';

import DetailHeader from '@/pages/detail/components/detailHeader';
import DetailFooter from '@/pages/detail/components/detailFooter';
import DetailContent from '@/pages/detail/components/detailContent';

import { Loading } from '@/components';
import api from '@/pages/detail/api';

import useRequest from '@/hooks/useRequest/useRequest';
import { IBookInfo } from '@/types/book';

const Detail: React.FC = React.memo(() => {
  const { data, error } = useRequest<IBookInfo>({ url: api.getBook(useParams().id as string) });

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <DetailHeader />
      <DetailContent />
      <DetailFooter />
    </>
  );
});

export default Detail;
