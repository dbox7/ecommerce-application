import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import { CLoginForm } from '../../components/loginForm/CLoginForm';

import './LoginPage.css';


export const LoginPage = () => {

  const { currentUser } = useTypedSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {

    if (currentUser.id !== '') {

      navigate('/');
  
    }

  }, [currentUser.id]);

  return (

    <div className="form-wrap">
      <CLoginForm />
    </div>

  );

};