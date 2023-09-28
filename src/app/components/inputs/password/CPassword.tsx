import { FC, useEffect, useState } from 'react';
import { IInputProps } from '../../../utils/types';

import showPasswordIcon from '../../../assets/show-password-icon.svg';
import hidePasswordIcon from '../../../assets/hide-password-icon.svg';

import { CInfo } from '../../info/CInfo';
import { validType } from '../../../utils/constants';

const CPassword: FC<IInputProps> = ({
  title,
  value, 
  changeHandler, 
  blurHandler, 
  activeState, 
  errors,
  className,
}) => {

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {

    (errors!.length > 0) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    activeState, 
    errors
  ]);

  const toggleShowPassword = () => {

    setShowPassword(!showPassword);
  
  };

  return ( 
    <div className="input-wrap">
      <label className="input-title">{title}</label>
      <CInfo text="Minimum 8 characters, at least 1 uppercase letter,
         1 lowercase letter, 1 number and 1 special character. No whitespaces, please."/>
      <input
        className={`input ${error} ${className || ''}`}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />

      {
        errors!.includes(validType.length) ?
          (!activeState) && 
          <div className="out-error">At least 8 characters</div>
          :
          (!activeState) && errors!.includes('password') && 
          <div className="out-error">Please, enter a correct password</div>
      }

      <img className="password-icon"
        src={showPassword ? showPasswordIcon : hidePasswordIcon}
        alt="Toggle Password"
        onClick={toggleShowPassword}
      />

    </div>
  );

};

export default CPassword;