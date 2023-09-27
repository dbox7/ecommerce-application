import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

export const NotFoundPage: FC = () => {

  return (
    <div className={styles['poster-wrap']}>
      <div className={styles['not-found-title']}>Interplanetary Oops:<br/> sneakers on an another planet...</div>
      <p className={styles['not-found-sub-title']}>back to <Link to="/" className={styles['link']}><b>Home</b></Link></p>
    </div>
  );

};