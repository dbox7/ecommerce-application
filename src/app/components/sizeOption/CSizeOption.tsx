import { useState } from 'react';
import { ALL_SIZES } from '../../utils/constants';

import './CSizeOption.css';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

interface ISizeOptionsProps { 
  sizes: number[],  
  selectedVariant: ProductVariant, 
  setSelectedVariant: Function, 
  product: ProductProjection
}

const CSizeOption = ({ sizes, selectedVariant, setSelectedVariant, product }: ISizeOptionsProps) => {
  
  const [selectedSize, setSelectedSize] = useState<number>(0);

  console.log('selectedVariant: ', selectedVariant);
  console.log('selectedSize: ', selectedSize);

  function getVariantBySize(product: ProductProjection, size: number) {

    let result = product.masterVariant.attributes?.find(attr => attr.name === 'Size' && attr.value.key === size.toString());

    if (result) return result;
    product.variants.forEach(variant => {

      result = variant.attributes?.find(attr => attr.name === 'Size' && attr.value.key === size.toString());
      if (result) return result;
    
    });
  
  }

  if (selectedVariant && selectedVariant.attributes) {

    setSelectedSize(selectedVariant.attributes?.find(attr => attr.name === 'Size')?.value.key);
  
  }

  console.log('selectedSize: ', selectedSize);
  

  return ( 
    <div className="size-option">
      {
        ALL_SIZES.map((size, idx) => (
          sizes.includes(size) ?
            <div className={selectedSize === size ? 'size active' : 'size'} 
              key={idx} 
              onClick={() => setSelectedVariant(getVariantBySize(product, size))}>
              US {size}</div>
            :
            <div className="size disabled" key={idx}>US {size}</div>
        ))
      }
    </div>
  );

};
 
export default CSizeOption;