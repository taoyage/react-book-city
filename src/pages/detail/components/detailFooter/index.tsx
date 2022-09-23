import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cx from 'classnames';
import { Button, Toast } from '@taoyage/react-mobile-ui';

import useRequest from '@/hooks/useRequest/useRequest';
import api from '@/pages/detail/api';
import { IBookInfo } from '@/types/book';
import { setShelf, isShelf } from '@/utils/shelf';

import styles from './index.module.scss';

const DetailFooter: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const params = useParams();

  const { data } = useRequest<IBookInfo>({ url: api.getBook(params.id as string) });

  const [shelfMode, setShelfMode] = React.useState<boolean>(isShelf(params.id as string));

  const onRead = () => {
    const bookId: string = params.id as string;
    navigate(`/book/${bookId}/1`);
  };

  const onShelf = () => {
    const msg = setShelf(data!);
    Toast.show(msg);
    setShelfMode(!shelfMode);
  };

  return (
    <div className={styles.footer}>
      <Button block color="primary" onClick={onRead}>
        开始阅读
      </Button>
      <div className={cx(styles.icon, { [styles.active]: shelfMode })} onClick={onShelf}>
        <i className="icon-book" />
        <p>加书架</p>
      </div>
    </div>
  );
});

export default DetailFooter;
