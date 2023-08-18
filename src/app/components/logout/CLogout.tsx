import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { anonUser } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';


export function Logout() {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (globalStore.currentUser.id) {

      setGlobalStore({...globalStore, currentUser: anonUser});

    }
    navigate('/');

  }, [globalStore, navigate, setGlobalStore]);

  return <></>;

}