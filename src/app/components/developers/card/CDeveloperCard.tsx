import { IDeveloper } from '../../../utils/types';

import { PiGithubLogoLight } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { PiTelegramLogoThin } from 'react-icons/pi';

import './CDeveloperCard.css';


export const CDeveloperCard = ({developer}: {developer: IDeveloper}) => {

  return (

    <div className="developer-card">
      <div className="developer-card__image">
        <img src={developer.photo} alt="avatar" />
      </div>
      <div className="developer-card__info">
        <h2 className="developer-card__name">{developer.name}</h2>
        <p className="developer-card__role">{developer.role}</p>
        <p className="developer-card__bio">{developer.bio}</p>
        <div className="developer-card__social-icons">
          <a href={developer.telegram}>
            <PiTelegramLogoThin className="developer-card__social-icons telegram"/>
          </a>
          <a href={developer.github}>
            <PiGithubLogoLight className="developer-card__social-icons github"/>
          </a>
          <a href={developer.email}>
            <CiMail className="developer-card__social-icons mail"/>
          </a>
        </div>
      </div>
    </div>   

  );

};