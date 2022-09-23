import React from 'react';
import { useParams } from 'react-router-dom';

import { chapterActions } from '@/pages/chapter/store';
import { NIGHT_THEME, NIGHT_THEME_TEXT_COLOR } from '@/pages/chapter/constants';
import api from '@/pages/chapter/api';

import { useInfiniteRequest } from '@/hooks/useRequest';
import { useAppDispatch, useAppSelector } from '@/store';
import { IChapterInfo } from '@/types/book';

import styles from './index.module.scss';

const ChapterContent: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { bookId, chapterId } = useParams();

  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);
  const footerNavBarVisible = useAppSelector<boolean>((state) => state.chapter.footerNavBarVisible);
  const theme = useAppSelector<string>((state) => state.chapter.theme);
  const fontSize = useAppSelector<number>((state) => state.chapter.fontSize);
  const nightTheme = useAppSelector<boolean>((state) => state.chapter.nightTheme);

  const { data, error, size, setSize, isValidating } = useInfiniteRequest<IChapterInfo[]>({
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
