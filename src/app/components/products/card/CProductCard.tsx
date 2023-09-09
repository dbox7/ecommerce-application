import { ProductProjection } from '@commercetools/platform-sdk';
import { useState } from 'react';

import CPrice from '../../price/CPrice';

import { BsCart2 } from 'react-icons/bs';

import './CProductCard.css';

export const CProductCard = ({ product }: { product: ProductProjection }) => {

  const [ addInCart, setAddInCart ] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    
    e.preventDefault();
    setAddInCart(!addInCart);

  };

  const cartIconDisabled = addInCart ? 'disabled' : '';

  return (
    <div className="product-card">
      <img src={ product.masterVariant.images![0].url } alt={ product.name.toString() } />
      <div className="product-card__container">
        <div className="product-card__name-and-price">
          <div className="product-card__name">{ product.name.en }</div>
          <CPrice 
            price={product.masterVariant.prices![0]} 
            isMini={true} 
          />
        </div>
        <BsCart2 className={`product-card__icon cart-icon ${cartIconDisabled}`} onClick={handleClick}/>
      </div>
    </div>
  );

};