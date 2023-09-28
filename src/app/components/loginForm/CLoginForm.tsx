import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useServerApi } from '../../services/useServerApi';
// import useInput from '../../services/input/useInput';
import useInput from '../../services/input/useInput2';
import UseFormBlock from '../../services/useFormBlock';
import { useShowMessage } from '../../services/useShowMessage';
import { EmailREGEXP, PasswordREGEXP, msg, validType } from '../../utils/constants';

import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CButton from '../button/CButton';

import './CLoginForm.css';
import { checkMinMax, checkRegExp, isEmpty } from '../../utils/usefullFuncs';


export const CLoginForm: FC = () => {
  
  const email = useInput('', [checkRegExp(EmailREGEXP, validType.email), isEmpty()]);
  const password = useInput('', [checkRegExp(PasswordREGEXP, validType.password), checkMinMax([8])]);
  
  const server = useServerApi();
  const showMessage = useShowMessage();
  
  // const isFormBlocked = UseFormBlock([
  //   email.valid!.isNotEmpty!,
  //   email.valid!.isEmailGood!,
  //   password.valid!.isNotEmpty!,
  //   password.valid!.isMinLength!,
  //   password.valid!.isPasswordGood!,
  // ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const res = await server.Login(email.value, password.value);

    if (res !== 'success') {

      res === 'Customer account with the given credentials not found.' ?
        showMessage(msg.LOGIN_USER_NOT_FOUND)
        :
        showMessage(msg.COMMON_ERROR);

    }
  
  };

  return (
    <div className="substrate">
      <div className="sub-title">Log in</div>      
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
          disabled={false}
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

  
