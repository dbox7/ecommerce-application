import { Price } from '@commercetools/platform-sdk';
import { FC } from 'react';

import './CPrice.css';

interface IPriceProps {
  price: Price,
  isMini?: boolean
}

const CPrice:FC<IPriceProps> = ({ price, isMini = false }) => {  

  return (

    price.discounted ?
      <div className="price">
        <del className="crossed">
          ${price.value.centAmount / 100}
        </del>
        <div className="new_price">
          ${price.discounted.value.centAmount / 100}
        </div>
      </div>
      :
      <div className="price">
        ${price.value.centAmount / 100}
      </div>

  );

};
 
export default CPrice;