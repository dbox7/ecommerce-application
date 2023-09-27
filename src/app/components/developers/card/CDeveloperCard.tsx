import { FC } from 'react';
import { IDeveloper } from '../../../utils/types';

import { PiGithubLogoLight } from 'react-icons/pi';
import { PiTelegramLogoThin } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';

import styles from './CDeveloperCard.module.css';

interface IDeveloperCardProps {
  developer: IDeveloper
}

export const CDeveloperCard: FC<IDeveloperCardProps> = ({ developer }) => {

  return (

    <div className={styles['developer-card']}>
      <div className={styles['developer-card__image']}>
        <img src={developer.photo} alt="avatar" />
      </div>
      <div className={styles['developer-card__info']}>
        <h2 className={styles['developer-card__name']}>{developer.name}</h2>
        <p className={styles['developer-card__role']}>{developer.role}</p>
        <p className={styles['developer-card__bio']}>{developer.bio}</p>
        <div className={styles['developer-card__social-icons']}>
          {[
            {link: developer.github, icon: <PiGithubLogoLight className={styles['developer-card__social-icons_github']} />},
            {link: developer.email, icon: <CiMail className={styles['developer-card__social-icons_mail']} />},
            {link: developer.telegram, icon: <PiTelegramLogoThin className={styles['developer-card__social-icons_telegram']} />}
          ].map((item, index) => (
            <a key={index} href={item.link} target="_blank" rel="noreferrer">
              {item.icon}
            </a>
          ))
          }
        </div>
      </div>
    </div>   

  );

};