import { Link } from 'react-router-dom';
import { useLogin } from '../../services/login/useLogin';


import useInput from '../../services/input/useInput';
import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CButton from '../button/CButton';
import CAlert from '../alert/CAlert';
import UseFormBlock from '../../services/useFormBlock';

import './CLoginForm.css';

export function CLoginForm() {

  const email = useInput('', 'email');
  const password = useInput('', 'password');
  
  const login = useLogin();
  
  const isFormBlocked = UseFormBlock([
    email.valid.isNotEmpty!,
    email.valid.isEmailGood!,
    password.valid.isNotEmpty!,
    password.valid.isMinLength!,
    password.valid.isPasswordGood!,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    login.createClient(email.value, password.value);
  
  };

  return (
    <div className="substrate">
      <div className="sub-title">Log in</div>
      
      <CAlert messages={login.errors}></CAlert>
      
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
          value="Log in"
          disabled={isFormBlocked}
        />
        <div>
          Don't have an account yet?
          <p className="login-form-link">
            <Link to="/signup" className="link"><b>Sign up</b></Link>
          </p>
        </div>
      </form>
    </div>
  );

}

  
