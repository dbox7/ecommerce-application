import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useServerApi } from '../../services/useServerApi';
import useInput from '../../services/input/useInput2';
import UseFormBlock from '../../services/useFormBlock';
import { useShowMessage } from '../../services/useShowMessage';
import { checkMinMax, checkRegExp, isEmpty } from '../../utils/usefullFuncs';
import { 
  EmailREGEXP, 
  PasswordREGEXP, 
  inputsInfo, 
  msg, 
  validError 
} from '../../utils/constants';

import CButton from '../button/CButton';
import CInput from '../inputs/CInput';

import './CLoginForm.css';


export const CLoginForm: FC = () => {

  const server = useServerApi();
  const showMessage = useShowMessage();
  
  const email = useInput(
    'email', 
    [
      checkRegExp(EmailREGEXP, validError.email), 
      isEmpty()
    ]
  );
  const password = useInput(
    'password', 
    [
      checkRegExp(PasswordREGEXP, validError.password), 
      checkMinMax([8], 'length')
    ]
  );
  
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
          <CInput 
            {...email}
            title="Email"
            info={inputsInfo.email}
          />
          <CInput 
            {...password}
            title="Password"
            info={inputsInfo.password}
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

  
