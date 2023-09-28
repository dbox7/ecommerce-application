import { 
  FC, 
  useEffect, 
  useState 
} from 'react';
import { IInputProps } from '../../../utils/types';

import { CInfo } from '../../info/CInfo';
import { validType } from '../../../utils/constants';


const CEmail: FC<IInputProps> = ({
  value, 
  changeHandler, 
  blurHandler, 
  activeState, 
  errors,
  className,
  children
}) => {

  const [error, setError] = useState('');

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

        {
          errors!.includes(validType.empty) ?
            (!activeState) && 
            <div className="out-error">Not be an empty</div>
            :
            (!activeState) && errors!.includes(validType.email) &&
            <div className="out-error">Please, enter a valid email</div>
        }
      </div>
    </>
  );

};

export default CEmail;