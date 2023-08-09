import { FC } from 'react';
import './CTextInput.css';

interface ITextInputProps {
  title: string;
  value: string;
  changeHandler: React.ChangeEventHandler;
  data?: string[];
}

const CTextInput: FC<ITextInputProps> = (props) => {

  return ( 
    <div className="input-wrap">
      <label className="input-title">{props.title}</label>
      <input
        className="input"
        type="text"
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

export default CTextInput;