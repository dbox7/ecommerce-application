import { useContext, useEffect } from 'react';
// import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';

import CUserProfileForm from '../../components/userProfileForm/CUserProfileForm';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';


export const UserProfilePage = () => {
  
  // const [globalStore] = useContext(GlobalContext);
  const {currentUser} = useTypedSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {

    if (!currentUser.id) {

      navigate('/login');
  
    }

  });

  return (
    <CUserProfileForm />
  );

};