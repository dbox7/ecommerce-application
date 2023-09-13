import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import useToastify from '../../services/useToastify';

import { CLoginForm } from '../../components/loginForm/CLoginForm';

import './LoginPage.css';


export const LoginPage = () => {

  const { currentUser, msg } = useTypedSelector(state => state.user);
  const navigate = useNavigate();
  const notify = useToastify();

  useEffect(() => {

    if (currentUser.id !== '') {

      navigate('/');
  
    }

    if (msg.body !== '') {

      msg.error ? 
        notify({ error: msg.body })
        :
        notify({ success: msg.body });

    }

  }, [currentUser.id, msg]);

  return (

    <div className="form-wrap">
      <CLoginForm />
    </div>

  );

};