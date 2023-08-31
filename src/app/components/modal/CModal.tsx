import { FC } from 'react';
import { IModalProps } from '../../utils/types';

import { BiCross } from 'react-icons/bi';
import './CModal.css';

const CModal: FC<IModalProps> = ({
  children,
  isActive,
  setIsActive

}) => {

  return (
    <div className={`modal ${isActive ? 'active' : ''}`} onClick={() => setIsActive(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <BiCross className="modal-close" onClick={() => setIsActive(false)}/>
        {children}
      </div>
    </div>
  );

};

export default CModal;