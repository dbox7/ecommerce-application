import { FC } from 'react';
import { IButtonProps } from '../../utils/types';

import './CButton.css';

const CButton: FC<IButtonProps> = ({ value, type, clickHandler, disabled, extraClass }) => {
  
  return (
    <button
      className={'button ' + extraClass}
      onClick={clickHandler}
      type={type}
      disabled={disabled}
    >
      {value}
    </button>
  );

};

export default CButton;