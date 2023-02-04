import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ErrorBlock } from '@taoyage/react-mobile-ui';

import { chapterActions } from '@/pages/chapter/store';
import { NIGHT_THEME, NIGHT_THEME_TEXT_COLOR } from '@/pages/chapter/constants';
import api from '@/pages/chapter/api';

import Loading from '@/components/loading';
import { useInfiniteRequest } from '@/hooks/useRequest';
import { useAppDispatch, useAppSelector } from '@/store';
import { IChapterInfo } from '@/types/book';

import styles from './index.module.scss';

const ChapterContent: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { bookId, chapterId } = useParams();

  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);
  const footerNavBarVisible = useAppSelector<boolean>((state) => state.chapter.footerNavBarVisible);
  const theme = useAppSelector<string>((state) => state.chapter.theme);
  const fontSize = useAppSelector<number>((state) => state.chapter.fontSize);
  const nightTheme = useAppSelector<boolean>((state) => state.chapter.nightTheme);

  const { error, data } = useInfiniteRequest<IChapterInfo[]>({
    url: api.getChapter(bookId as string, chapterId as string),
  });

  const onContent = () => {
    dispatch(chapterActions.setHeaderVisible(!headerVisible));
    dispatch(chapterActions.setFooterNavBarVisible(!footerNavBarVisible));
    dispatch(chapterActions.setFooterSettingBarVisible(false));
  };

  const renderChapter = (chapterInfo: IChapterInfo) => {
    return (
      <div key={chapterInfo.chapterId}>
        <h1>{chapterInfo.chapterName}</h1>
        {chapterInfo.content.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </div>
    );
  };

  if (error || (data && !data[0])) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div
      className={styles.content}
      onClick={onContent}
      style={{
        background: nightTheme ? NIGHT_THEME : theme,
        fontSize: fontSize,
        color: nightTheme ? NIGHT_THEME_TEXT_COLOR : '',
      }}
    >
      {data!.map((chapters: IChapterInfo[], index) => (
        <div key={index}>{chapters.map((chapterInfo: IChapterInfo) => renderChapter(chapterInfo))}</div>
      ))}
    </div>
  );
});

export default ChapterContent;
