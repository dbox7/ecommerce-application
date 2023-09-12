// import { useContext } from 'react';
// import { GlobalContext } from '../../store/GlobalContext';

import { CPromo } from '../../components/promo/CPromo';

import './MainPage.css';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

export const MainPage = () => {

  // const [globalStore] = useContext(GlobalContext);

  const { currentUser } = useTypedSelector(state => state.user);

  return (

    <>
      { currentUser.id ? 

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