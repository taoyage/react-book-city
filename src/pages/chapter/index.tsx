import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBlock } from '@taoyage/react-mobile-ui';

import Loading from '@/components/loading';
import ChapterHeader from '@/pages/chapter/components/header';
import ChapterContent from '@/pages/chapter/components/content';
import ChapterFooter from '@/pages/chapter/components/footer';

import { createReducer } from '@/pages/chapter/store';
import api from '@/pages/chapter/api';
import { IChapterInfo } from '@/types/book';
import { useReducer } from '@/store';
import { useInfiniteRequest } from '@/hooks/useRequest';

const Chapter: React.FC = React.memo(() => {
  const { bookId, chapterId } = useParams();
  const { data, error } = useInfiniteRequest<IChapterInfo>({
    url: api.getChapter(bookId as string, chapterId as string),
  });

  const { reducers } = React.useMemo(() => createReducer('chapter'), []);
  useReducer(reducers);

  if (error || (data && !data[0])) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <ChapterHeader />
      <ChapterContent />
      <ChapterFooter />
    </div>
  );
});

export default Chapter;
