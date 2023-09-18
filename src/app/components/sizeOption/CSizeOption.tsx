import { ALL_SIZES } from '../../utils/constants';

import './CSizeOption.css';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

interface ISizeOptionsProps { 
  sizes: string[],  
  selectedVariant: ProductVariant | undefined, 
  setSelectedVariant: Function, 
  product: ProductProjection
}

const CSizeOption = ({ sizes, selectedVariant, setSelectedVariant, product }: ISizeOptionsProps) => {
  
  function getVariantBySize(product: ProductProjection, size: string) {

    let result = product.masterVariant.attributes?.find(attr => attr.name === 'size' && attr.value.toString() === size.toString());

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