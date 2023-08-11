import { FC, useEffect, useState } from 'react';
import '../input.css';
import { ICountry, IInputProps } from '../../../utils/types';

type ITextDateInputProps = IInputProps & {
  title: string
  data?: ICountry[] | null;
  isDate?: boolean;
}

const CTextDateInput: FC<ITextDateInputProps> = ({
  value, 
  changeHandler, 
  blurHandler, 
  activeState, 
  valid, 
  title, 
  data, 
  isDate
}) => {

  const type = isDate ? 'date' : 'text';
  
  const [error, setError] = useState('');

  useEffect(() => {

    (valid.isEmpty || 
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
      <input
        className={'input ' + error}
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

      {valid.isEmpty && !activeState &&
      <div className="out-error">Not be an empty</div>}

      {!valid.isDateGood && !activeState && isDate && !valid.isEmpty &&
      <div className="out-error">You too young</div>}

      {!valid.isTextGood && !activeState && !isDate && !valid.isEmpty && (title !== 'Street') &&
      <div className="out-error">Don't use numbers or special chars</div>}

    </div>
  );

};

export default CTextDateInput;