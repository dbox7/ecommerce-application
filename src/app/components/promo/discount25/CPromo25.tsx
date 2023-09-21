import { FC } from 'react';

import styles from './CPromo25.module.css';

export const CPromo25: FC = () => {
  
  return (
    <div className={styles.promo__container}>
      <div className={styles.promo__container__content}>
        <div className={styles.promo__container__content__text}>
          <div className={styles.promo__container__content__text_left}>
            <h2>STARTED<br/>RUNNING<br/>WITH US</h2>
          </div>
          <div className={styles.promo__container__content__text_right}>
            <p>25% discount with a promo code</p>
            <p>only until the end of the month</p>
            <p className={styles.promo__container__content__code}><b>SPRINT25</b></p>
          </div>
        </div>
      </div>
    </div>
  );
  
};