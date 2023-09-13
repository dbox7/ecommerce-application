import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { useShowMessage } from '../../services/useShowMessage';

import { CLoginForm } from '../../components/loginForm/CLoginForm';

import './LoginPage.css';


export const LoginPage = () => {

  const { currentUser, msg } = useTypedSelector(state => state.user);
  const navigate = useNavigate();
  const showMessage = useShowMessage();

  useEffect(() => {

    if (currentUser.id !== '') {

      navigate('/');
  
    }

    showMessage(msg);

  }, [currentUser.id, msg]);

  return (

    <div className="form-wrap">
      <CLoginForm />
    </div>

  );

};