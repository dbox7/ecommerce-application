import { FC } from 'react';
import '../input.css';
import { IInputProps } from '../../../utils/types';

type ITextDateInputProps = IInputProps & {
  title: string
  data?: string[] | null;
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
  
  console.log(!valid.isDateGood, !activeState, isDate);
  

  return ( 
    <div className="input-wrap">
      <label className="input-title">{title}</label>
      <input
        className="input"
        type={type}
        value={value}
        onChange={changeHandler}
        required
        list="list"
      />

      {data ? (
        <datalist id="list">
          {data.map((item: string) => (
            <option value={item} key={item} />
          ))}
        </datalist>
      ) : ('')}

      {!valid.isDateGood && !activeState && isDate && 
      <div className="out-error">You too young</div>}

    </div>
  );

};

export default CTextDateInput;