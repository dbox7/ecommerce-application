// import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import { CPromo25 } from '../../components/promo/discount25/CPromo25';
import { CPromo10 } from '../../components/promo/discount10/CPromo10';

import './MainPage.css';


export const MainPage = () => {

  return (
    <div className="main-wrap">
      <div className="poster-wrap"/>
      <div className="promo-wrap">
        <CPromo25/>
      </div>
    </div>
  );

};