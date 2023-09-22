import { FC } from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import './CLoading.css';

export const CLoading: FC = () => {

  return (
    <div className="loading">
      <AiOutlineLoading3Quarters className="loading_icon"/>
      <span>Loading</span>
    </div>
  );

};