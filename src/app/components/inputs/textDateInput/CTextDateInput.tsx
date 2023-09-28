import { FC, useEffect, useState } from 'react';
import { ICountry, IInputProps } from '../../../utils/types';

import { CInfo } from '../../info/CInfo';

import '../input.css';
import { validError } from '../../../utils/constants';

type ITextDateInputProps = IInputProps & {
  title: string
  data?: ICountry[] | null
  isDate?: boolean
}

const CTextDateInput: FC<ITextDateInputProps> = ({
  value, 
  changeHandler,
  blurHandler,
  activeState,
  errors,
  title,
  data,
  isDate,
  className,
}) => {

  const type = isDate ? 'date' : 'text';
  
  const [error, setError] = useState('');

  useEffect(() => {

    (errors!.length > 0) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    activeState
  ]);

  return ( 
    <div className="input-wrap">
      <label className="input-title">{title}</label>
      <CInfo text={(isDate ? 'A valid date input ensuring the user is above a certain age (e.g., 14 years old or older)' : '') ||
          (!title.toLowerCase().includes('street') 
            ? 'Must contain at least one character and no special characters or numbers' : 'Must contain at least one character')}/>
      <input
        className={`input ${error} ${className || ''}`}
        type={type}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        list={data ? 'list' : undefined}
      />

      {data ? (
        <datalist id="list">
          {data.map((item: ICountry) => (
            <option value={item.name} key={item.name} />
          ))}
        </datalist>
      ) : ('')}


      {
        errors!.includes(validError.empty) ?
          (!activeState) && 
          <div className="out-error">Not be an empty</div>
          :
          isDate ?
            (!activeState) && errors!.includes(validError.age) &&
            <div className="out-error">You too young</div>
            :
            (!activeState) && errors!.includes(validError.text) && (title !== 'Street') &&
            <div className="out-error">Please, don't use nums or spec chars</div>
      }

    </div>
  );

};

export default CTextDateInput;