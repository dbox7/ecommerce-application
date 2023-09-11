import { IDeveloper } from '../../../utils/types';

import { PiGithubLogoLight } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { PiTelegramLogoThin } from 'react-icons/pi';

import './CDeveloperCard.css';



export const CDeveloperCard = ({developer}: {developer: IDeveloper}) => {

  return (

    <div className="developer-card">
      <div className="developer-image">
        <img src={developer.photo} alt="avatar" />
      </div>
      <div className="developer-info">
        <h2>{developer.name}</h2>
        <p>{developer.role}</p>
        <p>{developer.bio}</p>
        <div className="social-icons">
          <a href={developer.telegram}>
            <PiTelegramLogoThin className="icon-telegram"/>
          </a>
          <a href={developer.github}>
            <PiGithubLogoLight className="icon-git"/>
          </a>
          <a href={developer.email}>
            <CiMail className="icon-mail"/>
          </a>
        </div>
      </div>
    </div>   

  );

};