import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorBlock, Button } from '@taoyage/react-mobile-ui';

import { chapterActions } from '@/pages/chapter/store';
import { NIGHT_THEME, NIGHT_THEME_TEXT_COLOR } from '@/pages/chapter/constants';
import api from '@/pages/chapter/api';

import Loading from '@/components/loading';
import { useRequest } from '@/hooks/useRequest';
import { useAppDispatch, useAppSelector } from '@/store';
import { IChapterInfo, IBookInfo } from '@/types/book';

import styles from './index.module.scss';

const ChapterContent: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookId, chapterId } = useParams();

  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);
  const footerNavBarVisible = useAppSelector<boolean>((state) => state.chapter.footerNavBarVisible);
  const theme = useAppSelector<string>((state) => state.chapter.theme);
  const fontSize = useAppSelector<number>((state) => state.chapter.fontSize);
  const nightTheme = useAppSelector<boolean>((state) => state.chapter.nightTheme);

  const contentRef = React.useRef<HTMLDivElement>(null);

  const { data } = useRequest<IBookInfo>({ url: api.getBook(bookId as string) });
  const { error, data: chapters } = useRequest<IChapterInfo[]>({
    url: api.getChapter(bookId as string, chapterId as string),
  });

  const currentPageIndex = Number(chapterId);

  const isFirst = currentPageIndex === 1;
  const isLast = currentPageIndex === data?.chapters!.length;

  const onContent = () => {
    dispatch(chapterActions.setHeaderVisible(!headerVisible));
    dispatch(chapterActions.setFooterNavBarVisible(!footerNavBarVisible));
    dispatch(chapterActions.setFooterSettingBarVisible(false));
    dispatch(chapterActions.setFooterProgressBarVisible(false));
  };

  const renderChapter = (chapterInfo: IChapterInfo) => {
    return (
      <div key={chapterInfo.chapterId} data-id={chapterInfo.chapterIndex}>
        <h1>{chapterInfo.chapterName}</h1>
        {chapterInfo.content.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </div>
    );
  };

  const onPrev = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isFirst) return;
    navigate(`/book/${bookId}/${Number(chapterId) - 1}`, { replace: true });
  };

  const onNext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isLast) return;
    navigate(`/book/${bookId}/${Number(chapterId) + 1}`, { replace: true });
  };

  React.useEffect(() => {
    contentRef.current!.scrollTop = 0;
  }, [chapterId]);

  if (!chapters) {
    return <Loading />;
  }

  if (error || !chapters?.length) {
    return <ErrorBlock />;
  }

  return (
    <div
      className={styles.content}
      ref={contentRef}
      onClick={onContent}
      style={{
        background: nightTheme ? NIGHT_THEME : theme,
        fontSize: fontSize,
        color: nightTheme ? NIGHT_THEME_TEXT_COLOR : '',
      }}
    >
      {chapters.map((chapterInfo: IChapterInfo) => renderChapter(chapterInfo))}
      <div className={styles.pagination}>
        <Button onClick={onPrev} disabled={isFirst}>
          上一章
        </Button>
        <Button onClick={onNext} disabled={isLast}>
          下一章
        </Button>
      </div>
    </div>
  );
});

export default ChapterContent;
