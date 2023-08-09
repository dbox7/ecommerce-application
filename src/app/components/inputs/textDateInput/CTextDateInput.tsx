import { FC } from 'react';
import '../input.css';
import { IInputProps } from '../../../utils/types';

type ITextDateInputProps = IInputProps & {
  title: string
  data?: string[] | null;
  isDate?: boolean;
}

const CTextDateInput: FC<ITextDateInputProps> = (props) => {

  const type = props.isDate ? 'date' : 'text';

  return ( 
    <div className="input-wrap">
      <label className="input-title">{props.title}</label>
      <input
        className="input"
        type={type}
        value={props.value}
        onChange={props.changeHandler}
        required
        list="list"
      />
      {props.data ? (
        <datalist id="list">
          {props.data.map((item: string) => (
            <option value={item} key={item} />
          ))}
        </datalist>
      ) : ('')}
    </div>
  );

};

export default CTextDateInput;