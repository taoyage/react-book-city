import React from 'react';

import ChapterHeader from '@/pages/chapter/components/header';
import ChapterContent from '@/pages/chapter/components/content';
import ChapterFooter from '@/pages/chapter/components/footer';

import { createReducer } from '@/pages/chapter/store';
import { useReducer } from '@/store';

const Chapter: React.FC = React.memo(() => {
  const { reducers } = React.useMemo(() => createReducer('chapter'), []);
  useReducer(reducers);

  return (
    <div>
      <ChapterHeader />
      <ChapterContent />
      <ChapterFooter />
    </div>
  );
});

export default Chapter;
