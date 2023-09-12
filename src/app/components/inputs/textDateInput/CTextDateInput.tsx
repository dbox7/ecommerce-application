import { FC, useEffect, useState } from 'react';
import { ICountry, ITextDateInputProps } from '../../../utils/types';

import { CInfo } from '../../info/CInfo';

import '../input.css';

const CTextDateInput: FC<ITextDateInputProps> = ({
  value, 
  changeHandler,
  blurHandler,
  activeState,
  valid,
  title,
  data,
  isDate,
  className,
}) => {

  const type = isDate ? 'date' : 'text';
  
  const [error, setError] = useState('');

  useEffect(() => {

    (!valid.isNotEmpty || 
    (!valid.isDateGood && isDate) ||
    !valid.isTextGood && !isDate && (!title.toLowerCase().includes('street'))) && 
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

      {!valid.isNotEmpty && !activeState &&
      <div className="out-error">Not be an empty</div>}

      {!valid.isDateGood && !activeState && isDate && valid.isNotEmpty &&
      <div className="out-error">You too young</div>}

      {!valid.isTextGood && !activeState && !isDate && valid.isNotEmpty && (title !== 'Street') &&
      <div className="out-error">Don't use nums or spec chars</div>}

    </div>
  );

};

export default CTextDateInput;