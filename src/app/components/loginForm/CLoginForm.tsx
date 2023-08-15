import { apiRoot } from '../../ctp';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import useInput from '../../services/customHooks/useInput';
import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CButton from '../button/CButton';
import CAlert from '../alert/CAlert';

import './CLoginForm.css';
  
export const CLoginForm = () => {

  const navigate = useNavigate();

  const email = useInput('', 'email');

  const password = useInput('', 'password');
  const [errors, setErrors] = useState<String[]>([]);
  const [user, setUser] = useContext(UserContext); // подключаемся к контексту
  const [formBlocked, setFormBlocked] = useState(false);

  useEffect(() => { //если юзер есть, то перенаправляем на главную

    if (user.id) {

      navigate('/');
    
    }
  
  }, [user]); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setErrors([]);
    setFormBlocked(true);

    apiRoot
      .login()
      .post({
        body: {email: email.value, password: password.value}
      })
      .execute()

      .then(data => {

        localStorage.currentUser = JSON.stringify(data.body.customer);
        setUser(data.body.customer);
        navigate('/');

      })

      .catch(err => {

        setErrors([...errors, err.message]);
        setFormBlocked(false);

      });

  };

  return (
    <div>
      <h1>Log in</h1>

      <CAlert messages={errors}></CAlert>

      <form 
        className="login"
        onSubmit={handleSubmit}
      >
        <CEmail 
          {...email}
        />
        <CPassword 
          {...password}
        />
        <CButton
          type="submit"
          value="Log me in"
          disabled={formBlocked}
        />
        <div>don't have an account yet?
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );

};