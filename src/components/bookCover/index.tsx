import React from 'react';
import { Image } from '@taoyage/react-mobile-ui';

import styles from './index.module.scss';

export interface BookCoverProps {
  src: string;
  alt: string;
  style?: React.CSSProperties & Partial<Record<'--width' | '--height' | '--border-radius', string>>;
}

const BookCover: React.FC<BookCoverProps> = React.memo((props) => {
  return (
    <div className={styles.bookCover}>
      <Image src={props.src} alt={props.alt} lazy={true} className={styles.coverImg} style={props.style} />
    </div>
  );
});

export default BookCover;
