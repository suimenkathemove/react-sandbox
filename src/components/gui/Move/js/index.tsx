import { useEffect } from 'react';

import styles from '../styles.module.scss';

import { MovableElement } from './utils/MovableElement';

export const Move: React.VFC = () => {
  useEffect(() => {
    new MovableElement('move');
  }, []);

  return <div id="move" className={styles.base} />;
};
