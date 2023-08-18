import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalContext';
import { anonUser } from '../../utils/constants';


export function useLogout() {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const navigate = useNavigate();

  const logout = () => {

    if (globalStore.currentUser.id) {

      setGlobalStore({...globalStore, currentUser: anonUser});

    }
    navigate('/');

  };

  return logout;

}