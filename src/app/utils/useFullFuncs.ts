import { ProductProjection } from '@commercetools/platform-sdk';
import { IProductFilters, IQueryArgs } from './types';

export const getSizeArray = (product: ProductProjection) => {
  
  return [
    product.masterVariant.attributes!.find(attr => attr.name === 'size')?.value.toString(),
    ...product.variants.map(variant => 
      variant.attributes!.find(attr => 
        attr.name === 'size')?.value.toString())
  ];

};


export const checkFilters = (filters: IProductFilters) => {

  const concatQueryString = (attr: string, attrArray: string[]) => {
  
    let res = `variants.attributes.${attr}:`;
  
    attrArray.forEach((attr: string) => {
      
      res += `"${attr}",`;
    
    });
  
    return res.slice(0, -1);
  
  };
  
  let queryArgs: IQueryArgs = {
    limit: 30,
    filter: [], 
  };

  if (filters.search) {

    queryArgs['text.en'] = filters.search;

  }
  
  if ( filters.categoryId !== undefined ) {

    queryArgs.filter!.push(`categories.id:"${filters.categoryId}"`);
  
  }

  if ( filters.minPrice !== undefined || filters.maxPrice !== undefined) {

    queryArgs.filter!.push(`variants.price.centAmount:range (${filters.minPrice! * 100} to ${filters.maxPrice! * 100})`);
  
  }
  
  if ( filters.sizes && filters.sizes.length !== 0 ) {

    const res = concatQueryString('size', filters.sizes);

    queryArgs.filter!.push(res);

  }

  if (filters.brands && filters.brands.length !== 0) {

    const res = concatQueryString('Brand.key', filters.brands);

    queryArgs.filter!.push(res);
  
  }

  queryArgs.sort = filters.sort;

  return queryArgs;

};