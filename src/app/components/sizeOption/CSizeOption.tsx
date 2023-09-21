import { FC } from 'react';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { ALL_SIZES } from '../../utils/constants';

import './CSizeOption.css';

interface ISizeOptionsProps { 
  sizes: string[],  
  selectedVariant: ProductVariant | undefined, 
  setSelectedVariant: Function, 
  product: ProductProjection
}

const CSizeOption: FC<ISizeOptionsProps> = ({ sizes, selectedVariant, setSelectedVariant, product }) => {
  
  function getVariantBySize(product: ProductProjection, size: string) {

    let result = undefined;

    product.masterVariant.attributes?.forEach((attr) => {

      if(attr.name === 'size' && attr.value.toString() === size.toString()) {

        result = product.masterVariant;

      }
      
    });

    if (result) return result;

    return product.variants.find((v) => {

      return v.attributes?.find((attr) => {

        return attr.name === 'size' && attr.value.toString() === size.toString();

      });
      
    });

  
  }

  const selectedSize = String(selectedVariant?.attributes?.find((a) => a.name === 'size')?.value);

  return ( 
    <div className="size-option">
      {
        ALL_SIZES.map((size, idx) => (
          sizes.includes(size) ?
            <div className={selectedSize === size ? 'size active' : 'size'} 
              key={idx} 
              onClick={ () => setSelectedVariant(getVariantBySize(product, size)) }>
              US {size}</div>
            :
            <div className="size disabled" key={idx}>US {size}</div>
        ))
      }
    </div>
  );

};
 
export default CSizeOption;