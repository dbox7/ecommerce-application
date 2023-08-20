import { ProductProjection } from '@commercetools/platform-sdk';

import './CProductCard.css';

export const CProductCard = ({ product }: { product: ProductProjection }) => {



  if (product.masterVariant.prices![0].discounted) {
      
    return (
  
      <div className="product-card">
        <img src={ product.masterVariant.images![0].url } alt={ product.name.toString() } />
        <div className="product-card-name"><b>{ product.name.en }</b></div>
        <div className="product-card-description">{ product.description?.en }</div>
        <div className="product-card-discount">
          <del className="product-old-price"> { product.masterVariant.prices![0].value.centAmount / 100 }$
          </del>
          <div><b>
            { product.masterVariant.prices![0].discounted?.value.centAmount / 100 }
            $</b></div>
        </div>
      </div>

    );

  } else {

    return (
      <div className="product-card">
        <img src={ product.masterVariant.images![0].url } alt={ product.name.toString() } />
        <div className="product-card-name"><b>{ product.name.en }</b></div>
        <div className="product-card-description">{ product.description?.en }</div>
        <div><b>
          { product.masterVariant.prices![0].value.centAmount / 100 }
          $</b></div>
      </div>
    );

  }

};