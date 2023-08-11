import { FC } from 'react';
import { IButtonProps } from '../../utils/types';
import './CButton.css';

const CButton: FC<IButtonProps> = ({ value, clickHandler, type, disabled }) => {
  
  return (
    <button
      className="button"
      onClick={clickHandler}
      type={type}
      disabled={disabled}
    >
      {value}
    </button>
  );

};

export default CButton;