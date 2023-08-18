import { FC, useEffect, useState } from 'react';
import { IInputProps } from '../../../utils/types';
import showPasswordIcon from '../../../assets/show-password-icon.svg';
import hidePasswordIcon from '../../../assets/hide-password-icon.svg';

const CPassword: FC<IInputProps> = ({
  value, 
  changeHandler, 
  blurHandler, 
  activeState, 
  valid
}) => {

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {

    (valid.isEmpty || 
    !valid.isPasswordGood) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    activeState, 
    valid.isEmpty, 
    valid.isPasswordGood
  ]);

  const toggleShowPassword = () => {

    setShowPassword(!showPassword);
  
  };

  return ( 
    <div className="input-wrap">
      <label className="input-title">Password</label>
      <input
        className={'input ' + error}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        title="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
      />

      {!valid.isMinLength && !activeState &&
      <div className="out-error">At least 8 characters</div>}

      {!valid.isPasswordGood && !activeState && valid.isMinLength &&
      <div className="out-error">Enter correct password</div>}

      <div
        className="show-password-button"
        onClick={toggleShowPassword}
      >
        <img className="password-icon"
          src={showPassword ? showPasswordIcon : hidePasswordIcon}
          alt="Toggle Password" />
      </div>

    </div>
  );

};

export default CPassword;