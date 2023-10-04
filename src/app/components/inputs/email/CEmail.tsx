import { 
  FC, 
  useEffect, 
  useState 
} from 'react';
import { IInputProps } from '../../../utils/types';

import { CInfo } from '../../info/CInfo';


const CEmail: FC<IInputProps> = ({
  value, 
  changeHandler, 
  blurHandler, 
  activeState, 
  valid,
  className,
  children
}) => {

  const [error, setError] = useState('');

  useEffect(() => {

    (!valid.isNotEmpty || 
    !valid.isEmailGood) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    activeState, 
    valid.isEmailGood, 
    valid.isNotEmpty
  ]);

  return ( 
    <>
      <div className="input-wrap">
        <label className="input-title">Email</label>
        <CInfo text="A properly formatted email address (e.g., example@email.com)"/>
        <input
          className={`input ${error} ${className || ''}`}
          type="email"
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          children={children}
        />

        {!valid.isNotEmpty && !activeState &&
        <div className="out-error">Not be an empty</div>}

        {!valid.isEmailGood && !activeState && 
        <div className="out-error">Enter right email</div>}
      </div>
    </>
    
  );

};

export default CEmail;