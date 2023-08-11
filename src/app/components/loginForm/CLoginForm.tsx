import { apiRoot } from '../../ctp';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CButton from '../button/CButton';

import './CLoginForm.css';
  
export const CLoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<String[]>([]);
  const [user, setUser] = useContext(UserContext); // подключаемся к контексту
  const [formBlocked, setFormBlocked] = useState(false);


  useEffect(() => { //если юзер есть, то перенаправляем на главную

    if (user.id) {

      navigate('/');
    
    }
  
  }, [user]); 


  const handleInputChange = (field: string, value: string) => {

    switch (field) {

    case 'email':
      setEmail(value);
      break;

    case 'password':
      setPassword(value);
      break;
        
    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setErrors([]);
    setFormBlocked(true);

    apiRoot
      .login()
      .post({
        body: {email, password}
      })
      .execute()

      .then(data => {

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
      <form 
        className="login"
        onSubmit={handleSubmit}
      >
        <CEmail 
          value={email}
          changeHandler={(e) => handleInputChange('email', (e.target as HTMLInputElement).value)}
        />
        <CPassword 
          value={password}
          changeHandler={(e) => handleInputChange('password', (e.target as HTMLInputElement).value)}
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