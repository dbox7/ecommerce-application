import { FC } from 'react';
import { IModalProps } from '../../utils/types';
import './CModal.css';

const CModal: FC<IModalProps> = ({
  children,
  isActive,
  setIsActive

}) => {

  return (
    <div className={`modal ${isActive ? 'active' : ''}`} onClick={() => setIsActive(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

};

export default CModal;