import { useEffect, useState, FC } from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import './CInfo.css'; 

interface IInfoProps {
  text: string
}

export const CInfo: FC<IInfoProps> = ({ text }) => {

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

};