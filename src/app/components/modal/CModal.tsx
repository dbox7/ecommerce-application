import { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { RxCross2 } from 'react-icons/rx';

import './CModal.css';

interface IModalProps {
  children: React.ReactNode;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>> | ((isActive: boolean) => void);
}

const CModal: FC<IModalProps> = ({
  children,
  isActive,
  setIsActive
}) => {

  return (
    <div 
      className={`modal ${isActive ? 'active' : ''}`} 
      onClick={() => setIsActive(false)}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2 
          className="modal-close" 
          onClick={() => setIsActive(false)}
        />
        {children}
      </div>
    </div>
  );

};

export default CModal;