import { 
  FC, 
  useEffect, 
  useState 
} from 'react';
import { IInputProps } from '../../utils/types';

import { CInfo } from '../info/CInfo';


const CInput: FC<IInputProps> = ({
  title,
  info,
  value,
  type,
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
  
  console.log(errors);
  

  return ( 
    <>
      <div className="input-wrap">
        <label className="input-title">{title}</label>
        { info && <CInfo text={info}/> }
        <input
          className={`input ${error} ${className}`}
          type={type}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          children={children}
        />

        { !activeState && <div className="out-error">{errors[errors.length - 1]}</div> }
      </div>
    </>
  );

};

export default CInput;