import { FC } from 'react';
import { IButtonProps } from '../../utils/types';

const CButton: FC<IButtonProps> = ({ value, clickHandler }) => {
  
  return (
    <button
      className="button"
      onClick={clickHandler}
    >
      {value}
    </button>
  );

};

export default CButton;