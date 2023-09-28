import { ProductProjection } from '@commercetools/platform-sdk';
import { IProductFilters, IQueryArgs, IRule } from './types';
import { COUNTRIES, MS_IN_YEAR, validError } from './constants';

export const getSizeArray = (product: ProductProjection) => {
  
  return [
    product.masterVariant.attributes!.find(attr => attr.name === 'size')?.value.toString(),
    ...product.variants.map(variant => 
      variant.attributes!.find(attr => 
        attr.name === 'size')?.value.toString())
  ];

};

export const checkRegExp: IRule<RegExp, string> = (option, msg) => (value) => {

  if (option.test(value)) {

    return {
      valid: true
    };
  
  } else {

    return {
      valid: false,
      msg
    };
  
  }

};

export const checkPostalCode: IRule<void, void> = (option) => (value) => {

  if (COUNTRIES.some((country) => country.postalCode.test(value))) {

    return {
      valid: true
    };
  
  } else {

    return {
      valid: false,
      msg: validError.postalCode
    };
  
  }

};

export const isEmpty: IRule<void, void> = (option) => (value) => {
  
  if (value !== '') {

    return {
      valid: true
    };

  } else {

    return {
      valid: false,
      msg: validError.empty
    };

  }

};

export const checkMinMax: IRule<[number, number?], 'date' | 'length' | 'num'> = ([min = 0, max = 100], type) => (value) => {
  
  let checkValue = 0;
  let msg = '';

  if (type === 'date') {

    // Проверяет дату
    checkValue = Math.floor((Date.now() - Date.parse(value)) / MS_IN_YEAR);
    msg = validError.age;

  } else if (type === 'length') {

    // Проверяет длину строки
    checkValue = value.length;
    msg = validError.pwdLength;

  } else if (type === 'num'){

    // Проверяет любое число
    checkValue = Number(value);
    msg = `Enter number from ${min} to ${max}`;

  }  

  if (min <= checkValue && checkValue <= max) {

    return {
      valid: true
    };

  } else {

    return {
      valid: false,
      msg
    };

  }

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