import boxPic01 from '../../../assets/sneakers-box-01.png';
import boxPic02 from '../../../assets/sneakers-box-02.png';
import boxPic03 from '../../../assets/sneakers-box-03.png';

import styles from './CPromo10.module.css';

export const CPromo10 = () => {
  
  return (
    <div className={styles.promo__container}>
      <div className={styles.promo__container__content}>
        <div className={styles.promo__container__content__text}>
          <div className={styles.promo__container__content_left}>
            <p>Get 10% off your order of $1000 or more with promo code:</p>
            <p className={styles.promo__container__content__code}><b>BIGORDERDEAL</b></p>
          </div>
          <div className={styles.promo__container__content_right}>
            <img className={styles.promo__container__content_img1} src={boxPic01}></img>
            <b>+</b>
            <img className={styles.promo__container__content_img2} src={boxPic02}></img>
            <b>+</b>
            <img className={styles.promo__container__content_img3} src={boxPic03}></img>
          </div>

        </div>
      </div>
    </div>
  );
  
};