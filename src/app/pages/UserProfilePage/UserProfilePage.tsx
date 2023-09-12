import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToastify from '../../services/useToastify';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import CUserProfileForm from '../../components/userProfileForm/CUserProfileForm';


export const UserProfilePage = () => {
  
  const { currentUser, msg } = useTypedSelector(state => state.user);
  const navigate = useNavigate();
  const notify = useToastify();

  useEffect(() => {

    if (currentUser.id === '') {

      navigate('/login');
  
    }

    if (msg.body !== '') {

      msg.error ? 
        notify({ error: msg.body })
        :
        notify({ success: msg.body });

    }

  });

  return (
    <CUserProfileForm />
  );

};