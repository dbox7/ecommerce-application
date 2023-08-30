import { Link } from 'react-router-dom';
import { useServerApi } from '../../services/useServerApi';
import useInput from '../../services/input/useInput';
import UseFormBlock from '../../services/useFormBlock';

import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CButton from '../button/CButton';
import CAlert from '../alert/CAlert';

import './CLoginForm.css';

export const CLoginForm = () => {

  const email = useInput('', 'email');
  const password = useInput('', 'password');
  
  const server = useServerApi();
  
  const isFormBlocked = UseFormBlock([
    email.valid.isNotEmpty!,
    email.valid.isEmailGood!,
    password.valid.isNotEmpty!,
    password.valid.isMinLength!,
    password.valid.isPasswordGood!,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    server.Login(email.value, password.value);
  
  };

  return (
    <div className="substrate">
      <div className="sub-title">Log in</div>
      
      <CAlert message={server.error} />
      
      <form 
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="info-block">
          <CEmail {...email}/>
          <CPassword 
            {...password}
            title="Password"
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

};

  
