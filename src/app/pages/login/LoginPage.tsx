import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { CLoginForm } from '../../components/loginForm/CLoginForm';

import './LoginPage.css';

export function LoginPage(): JSX.Element {

  const [globalStore] = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (globalStore.currentUser.id) {

      navigate('/');
  
    }

  });

  return (

    <div className="container">
      <div className="content">
        <div className="form-wrap">
          <CLoginForm />
        </div>
      </div>
    </div>

  );

};