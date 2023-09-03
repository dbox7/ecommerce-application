import { FC } from 'react';
import { IPriceProps } from '../../utils/types';

import './CPrice.css';

const CPrice:FC<IPriceProps> = ({ price, isMini = false }) => {  

  const miniClass = isMini ? 'isMini' : '';

  return (

    price.discounted ?
      <div className={ 'price ' + miniClass }>
        <div className={ 'crossed ' + miniClass }>
          ${price.value.centAmount / 100}
        </div>
        <div className={ 'new_price ' + miniClass }>
          ${price.discounted.value.centAmount / 100}
        </div>
      </div>
      :
      <div className={ 'price ' + miniClass }>
        ${price.value.centAmount / 100}
      </div>

  );

};
 
export default CPrice;