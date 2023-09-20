import { FC } from 'react';

import './CButton.css';

export interface IButtonProps {
  value: string
  type: 'button' | 'submit' | 'reset'
  clickHandler?: React.MouseEventHandler
  disabled?: boolean
  extraClass?: string
}

const CButton: FC<IButtonProps> = ({ 
  value, 
  type, 
  clickHandler, 
  disabled, 
  extraClass 
}) => {
  
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