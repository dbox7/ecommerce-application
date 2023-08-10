import { FC, useEffect, useState } from 'react';
import { IInputProps } from '../../../utils/types';

const CEmail: FC<IInputProps> = ({value, changeHandler, blurHandler, activeState, valid}) => {

  const [error, setError] = useState('');

  useEffect(() => {

    (valid.isEmpty || 
    !valid.isEmailGood) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    valid.isEmpty, 
    valid.isEmailGood, 
    activeState
  ]);

  return ( 
    <div className="input-wrap">
      <label className="input-title">Email</label>
      <input
        className={'input ' + error}
        type="email"
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        title="A properly formatted email address (e.g., example@email.com)"
        required
      />
      {valid.isEmpty && !activeState && <div>Not empty</div>}
      {!valid.isEmailGood && !activeState && <div>Enter right email</div>}
    </div>
  );

};

export default CEmail;