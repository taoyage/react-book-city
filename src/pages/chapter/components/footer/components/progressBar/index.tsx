import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cx from 'classnames';
import { Popup, Slider, SliderRef } from '@taoyage/react-mobile-ui';

import api from '@/pages/chapter/api';

import { useRequest } from '@/hooks/useRequest';
import { useAppSelector } from '@/store';
import { IBookInfo } from '@/types/book';

import styles from './index.module.scss';

const ProgressBar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { bookId, chapterId } = useParams();

  const footerProgressBarVisible = useAppSelector<boolean>((state) => state.chapter.footerProgressBarVisible);
  const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(Number(chapterId));

  const sliderRef = React.useRef<SliderRef>(null);

  const { data } = useRequest<IBookInfo>({ url: api.getBook(bookId as string) });

  const isFirst = currentPageIndex === 1;
  const isLast = currentPageIndex === data?.chapters!.length;

  const onChangeAfter = (value: number) => {
    navigate(`/book/${bookId}/${value}`, { replace: true });
  };

  const onChange = (value: number) => {
    setCurrentPageIndex(value);
  };

  const onPrev = () => {
    if (isFirst) return;
    setCurrentPageIndex(currentPageIndex - 1);
    navigate(`/book/${bookId}/${currentPageIndex - 1}`, { replace: true });
  };

  const onNext = () => {
    if (isLast) return;
    setCurrentPageIndex(currentPageIndex + 1);
    navigate(`/book/${bookId}/${currentPageIndex + 1}`, { replace: true });
  };

  React.useEffect(() => {
    setCurrentPageIndex(Number(chapterId));
  }, [chapterId]);

  React.useEffect(() => {
    const element = sliderRef.current;
    if (!element) return;
    sliderRef.current.setValue(Number(chapterId));
  }, [chapterId]);

  return (
    <Popup position="bottom" visible={footerProgressBarVisible} mask={false}>
      <div className={styles.progress}>
        <div className={styles.progressVal}>{`chapter${currentPageIndex}`}</div>
        <div className={styles.progressBar}>
          <div className={cx(styles.prev, { [styles.disable]: isFirst })} onClick={onPrev}>
            上一章
          </div>
          <div className={styles.slider}>
            <Slider
              ref={sliderRef}
              value={currentPageIndex}
              onChange={onChange}
              onChangeAfter={onChangeAfter}
              min={1}
              max={data?.chapters!.length}
            />
          </div>
          <div className={cx(styles.next, { [styles.disable]: isLast })} onClick={onNext}>
            下一章
          </div>
        </div>
      </div>
    </Popup>
  );
});

export default ProgressBar;
