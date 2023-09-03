import { ProductProjection } from '@commercetools/platform-sdk';

import { RiShoppingCartLine } from 'react-icons/ri';

import './CProductCard.css';
import CPrice from '../../price/CPrice';

export const CProductCard = ({ product }: { product: ProductProjection }) => {

  return (
    <div className="product-card">
      <img src={ product.masterVariant.images![0].url } alt={ product.name.toString() } />
      <div className="product-card-name"><b>{ product.name.en }</b></div>
      {/* <div className="product-card-description">{ product.description?.en }</div> */}
      <div className="product-card-price-container">
        <CPrice price={product.masterVariant.prices![0]} />
        <RiShoppingCartLine className="cart-icon"/>
      </div>
    </div>
  );

};