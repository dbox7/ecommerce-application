import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import './CInfo.css';


export function CInfo( { text }: { text: string } ) {

  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {

    setShowInfo(!showInfo);

  };

  return (

    <div className="info-container">
      <AiOutlineInfoCircle className="info-icon" onClick={handleInfoClick}/>
      <div className={showInfo ? 'info-text' : 'info-text hidden'}>{text}</div>
    </div>
    
  );

}