import { FC } from 'react';

import './CSizeOption.css';

const CSizeOption:FC<string[]> = (sizes) => {

  sizes = ['US 8', 'US 8.5', 'US 9', 'US 9.5'];

  return ( 
    <div className="size-option">
      {
        sizes.map(size => (
          <div className="size">{size}</div>
        ))
      }
    </div>
  );

};
 
export default CSizeOption;