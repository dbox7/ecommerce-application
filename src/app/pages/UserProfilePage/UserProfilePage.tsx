import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';

import CUserProfileForm from '../../components/userProfileForm/CUserProfileForm';


export const UserProfilePage = () => {
  
  const [globalStore] = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (!globalStore.currentUser.id) {

      navigate('/login');
  
    }

  });

  return (
    <CUserProfileForm />
  );

};