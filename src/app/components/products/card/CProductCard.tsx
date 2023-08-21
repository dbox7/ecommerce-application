import { ProductProjection } from '@commercetools/platform-sdk';
import { RiShoppingCartLine } from 'react-icons/ri';

import './CProductCard.css';

export const CProductCard = ({ product }: { product: ProductProjection }) => {

  console.log(product);
  return (
  
    <div className="product-card">
      <img src={ product.masterVariant.images![0].url } alt={ product.name.toString() } />
      <div className="product-card-name"><b>{ product.name.en }</b></div>
      <div className="product-card-description">{ product.description?.en }</div>
      <div className="product-card-price-container">
        { product.masterVariant.prices![0].discounted ? 
          <>
            <div className="product-card-discount">
              <del className="product-old-price"> { product.masterVariant.prices![0].value.centAmount / 100 }$
              </del>
              <div><b>
                { product.masterVariant.prices![0].discounted?.value.centAmount / 100 }
                $</b></div>
            </div> 
            <RiShoppingCartLine className="cart-icon"/>
          </>
          :
          <>
            <div><b>
              { product.masterVariant.prices![0].value.centAmount / 100 }
              $</b></div>
            <RiShoppingCartLine className="cart-icon"/>
          </>
        } 
        
      </div>
    </div>

  );

};