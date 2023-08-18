import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalContext';
import { PROJECT_KEY, API_URL, AUTH_URL, CLIENT_ID, CLIENT_SECRET } from '../../ctp';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import useInput from '../../services/customHooks/useInput';
import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CButton from '../button/CButton';
import CAlert from '../alert/CAlert';

import './CLoginForm.css';
  
export function CLoginForm() {

  const navigate = useNavigate();

  const email = useInput('', 'email');
  const password = useInput('', 'password');
  
  const [errors, setErrors] = useState<String[]>([]);
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [formBlocked, setFormBlocked] = useState(false);

  useEffect(() => {

    if (globalStore.currentUser.id) {

      navigate('/');
    
    }
  
  }, [globalStore, navigate]); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setErrors([]);
    setFormBlocked(true);

    const ctpMeClient = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withPasswordFlow({
        host: AUTH_URL,
        projectKey: PROJECT_KEY,
        credentials: {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          user: {
            username: email.value,
            password: password.value
          }
        }
      })
      .withHttpMiddleware({
        host: API_URL,
        fetch,
      })
      .withLoggerMiddleware() // Include middleware for logging
      .build();
    
    const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});
  
    apiMeRoot.me().login().post({
      body: {email: email.value, password: password.value}
    })
      .execute()
      .then(data => {

        // Сохраняем в глобальном хранилище и профиль пользователя, и API для обращений от его имени

        setGlobalStore({...globalStore, currentUser: data.body.customer, apiMeRoot: apiMeRoot});
        navigate('/');

      }).catch(err => {

        setErrors([...errors, err.message]);
        setFormBlocked(false);

      });

  };

  if (globalStore.currentUser.id) {

    return <></>;
    
  }

  return (
    <div className="substrate">
      <div className="sub-title">Log in</div>
      
      <CAlert messages={errors}></CAlert>
      
      <form 
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="info-block">
          <CEmail 
            {...email}
          />
          <CPassword 
            {...password}
          />
        </div>
        <CButton
          type="submit"
          value={ formBlocked ? 'Please wait...' : 'Log in' }
          disabled={formBlocked}
        />
        <div>
          Don't have an account yet? <Link to="/signup" className="link"><b>Sign up</b></Link>
        </div>
      </form>
    </div>
  );

}

  
