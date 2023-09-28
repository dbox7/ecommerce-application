import { FC } from 'react';
import { Link } from 'react-router-dom';

import { SOCIAL_LINKS } from '../../utils/constants';

import styles from './CFooter.module.css';

export const Footer: FC = () => {

  return (

    <footer className={styles['footer']}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-outer-links']}>
          <div className={styles['footer-icons']}>
            { SOCIAL_LINKS.map((item, index) => (
              <Link key={index} to={item.link} className={styles['ink']} target="_blank">
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles['footer-logo']}>
          <Link to="/" className={styles['link']}>SNEAKERS STORE</Link>
        </div> 
        <div className={styles['footer-inner-links']}>
          <Link to="/about" className={styles['footer-link']}>About Us</Link>
          <Link to="/contacts" className={styles['footer-link']}>Contacts</Link>
        </div>
      </div>
    </footer>

  );

};