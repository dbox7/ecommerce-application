import { FC } from 'react';
import './CCheckbox.css';
import { ICheckboxProps } from '../../../utils/types';

const CCheckbox: FC<ICheckboxProps> = (props) => {

  return ( 
    <label className="checkbox-wrap">
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.changeHandler}
      />
      {props.title}
    </label>
  );

};

export default CCheckbox;