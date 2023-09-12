import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import { CPromo } from '../../components/promo/CPromo';

import './MainPage.css';


export const MainPage = () => {

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