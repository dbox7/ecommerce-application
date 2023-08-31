import { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';

import { CPromo } from '../../components/promo/CPromo';

import './MainPage.css';

export const MainPage = () => {

  const [globalStore] = useContext(GlobalContext);

  return (

    <>
      { globalStore.currentUser.id ? 

        <>
          <div className="poster-wrap"></div>
          <CPromo/>
        </>
            
        :
        <div className="poster-wrap"></div>
      }
    </>

  );

};