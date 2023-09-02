import { ProductProjection } from '@commercetools/platform-sdk';

export const getSizeArray = (product: ProductProjection) => {
  
  return [
    product.masterVariant.attributes!.find(attr => attr.name === 'size')?.value.toString(),
    ...product.variants.map(variant => 
      variant.attributes!.find(attr => 
        attr.name === 'size')?.value.toString())
  ];

};