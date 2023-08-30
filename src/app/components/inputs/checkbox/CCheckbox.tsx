import { FC } from 'react';
import { ICheckboxProps } from '../../../utils/types';

import './CCheckbox.css';

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