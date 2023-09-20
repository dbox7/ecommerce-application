import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import { CPromo25 } from '../../components/promo/discount25/CPromo25';
import { CPromo10 } from '../../components/promo/discount10/CPromo10';

import './MainPage.css';


export const MainPage = () => {

  const { currentUser } = useTypedSelector(state => state.user);

  return (

    <>
      { currentUser.id ? 
        <div className="main-wrap">
          <div className="promo-wrap">
            <CPromo25/>
            <CPromo10/>
          </div>
          <div className="poster-wrap"/>
        </div>
        :
        <div className="poster-wrap-full"/>
      }
    </>

  );

};