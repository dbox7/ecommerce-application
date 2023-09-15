import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import CUserProfileForm from '../../components/userProfileForm/CUserProfileForm';


export const UserProfilePage = () => {
  
  const { currentUser } = useTypedSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {

    if (currentUser.id === '') {

      navigate('/login');
  
    }

  });

  return (
    <CUserProfileForm />
  );

};