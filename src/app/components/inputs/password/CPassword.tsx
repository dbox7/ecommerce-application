import { FC, useEffect, useState } from 'react';
import { IInputProps } from '../../../utils/types';

const CPassword: FC<IInputProps> = ({value, changeHandler, blurHandler, activeState, valid}) => {

  const [error, setError] = useState('');

  useEffect(() => {

    (valid.isEmpty || 
    !valid.isPasswordGood) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    valid.isEmpty, 
    valid.isPasswordGood, 
    activeState
  ]);

  return ( 
    <div className="input-wrap">
      <label className="input-title">Password</label>
      <input
        className={'input ' + error}
        type="password"
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        title="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
      />
      {/* {valid.isEmpty && !activeState && <div className="out-error">Not empty</div>} */}
      {!valid.isPasswordGood && !activeState && <div className="out-error">Enter correct password</div>}
    </div>
  );

};

export default CPassword;