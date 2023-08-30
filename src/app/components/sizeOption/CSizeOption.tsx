import { FC } from 'react';

import './CSizeOption.css';

const CSizeOption:FC<number[]> = (sizes) => {

  sizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12];

  return ( 
    <div className="size-option">
      {
        sizes.map(size => (
          <div className="size">US {size}</div>
        ))
      }
    </div>
  );

};
 
export default CSizeOption;