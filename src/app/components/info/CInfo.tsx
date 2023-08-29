import { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IInfoProps } from '../../utils/types';

import './CInfo.css'; 


export function CInfo({ text }: IInfoProps): JSX.Element {

  const [showInfo, setShowInfo] = useState(false);


  useEffect(() => {

    function closeInfo() {

      setShowInfo(false);

    }

    document.addEventListener('click', closeInfo);

    return () => {

      document.removeEventListener('click', closeInfo);

    };

  }, []);

  const handleInfoClick = (event: React.MouseEvent) => {

    event.stopPropagation();
    setShowInfo(!showInfo);

  };

  return (

    <div className="info-container">
      <AiOutlineInfoCircle className="info-icon" onClick={handleInfoClick}/>
      <div className={showInfo ? 'info-text' : 'info-text hidden'}>{text}</div>
    </div>
    
  );

}