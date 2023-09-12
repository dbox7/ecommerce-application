import { useContext, useEffect } from 'react';
// import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';

import { CLoginForm } from '../../components/loginForm/CLoginForm';

import './LoginPage.css';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

export const LoginPage = () => {

  // const [globalStore] = useContext(GlobalContext);
  const {currentUser} = useTypedSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {

    if (currentUser.id) {

      navigate('/');
  
    }

  });

  return (

    <div className="form-wrap">
      <CLoginForm />
    </div>

  );

};