import { FC, useEffect, useState } from 'react';
import { IInputProps } from '../../../utils/types';
import showPasswordIcon from '../../../assets/show-password-icon.svg';
import hidePasswordIcon from '../../../assets/hide-password-icon.svg';

const CPassword: FC<IInputProps> = ({
  title,
  value, 
  changeHandler, 
  blurHandler, 
  activeState, 
  valid,
  className,
}) => {

  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {

    (!valid.isNotEmpty || 
    !valid.isPasswordGood) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    activeState, 
    valid.isNotEmpty, 
    valid.isPasswordGood
  ]);

  const toggleShowPassword = () => {

    setShowPassword(!showPassword);
  
  };

  return ( 
    <div className="input-wrap">
      <label className="input-title">{title}</label>
      <input
        className={`input ${error} ${className || ''}`}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        title="Minimum 8 characters, at least 1 uppercase letter,
         1 lowercase letter, 1 number and 1 special character. No whitespaces, please."
      />

      {!valid.isMinLength && !activeState &&
      <div className="out-error">At least 8 characters</div>}

      {!valid.isPasswordGood && !activeState && valid.isMinLength &&
      <div className="out-error">Enter correct password</div>}

      <img className="password-icon"
        src={showPassword ? showPasswordIcon : hidePasswordIcon}
        alt="Toggle Password"
        onClick={toggleShowPassword}
      />

    </div>
  );

};

export default CPassword;