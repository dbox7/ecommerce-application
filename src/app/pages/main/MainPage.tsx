import { FC } from 'react';
import { CPromo25 } from '../../components/promo/discount25/CPromo25';

import './MainPage.css';


export const MainPage: FC = () => {

  return (
    <div className="main-wrap">
      <div className="poster-wrap"/>
      <div className="promo-wrap">
        <CPromo25/>
      </div>
    </div>
  );

};