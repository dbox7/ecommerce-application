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
  dataList,
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
        <label className="input-title">{title}</label>
        { info && <CInfo text={info}/> }
        <input
          className={`input ${error} ${className}`}
          type={type}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          children={children}
          list={dataList ? 'list' : undefined}
        />

        {dataList ? (
          <datalist id="list">
            {dataList.map((item) => (
              <option value={item.name} key={item.name} />
            ))}
          </datalist>
        ) : ('')}

        { !activeState && <div className="out-error">{errors[errors.length - 1]}</div> }
      </div>
    </>
  );

};

export default CInput;