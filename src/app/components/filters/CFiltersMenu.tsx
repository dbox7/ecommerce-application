import useMultiRange from '../../services/input/useMultiRange';
import { ProductProjection } from '@commercetools/platform-sdk';
import CButton from '../button/CButton';
import CRange from '../inputs/range/CRange';

import './CFiltersMenu.css';
import { getSizeArray } from '../../utils/useFullFuncs';
import CSizeOption from '../sizeOption/CSizeOption';
import CCheckboxArray from './checkboxArray/CCheckboxArray';
import { useState } from 'react';

const getPriceRange = (prods: ProductProjection[]) => {
  
  let min = 1000;
  let max = 0;

  const checkPrice = (price: number) => {
    
    price = price / 100;
    
    min = price < min ? price : min;
    max = price > max ? price : max;

  };

  prods.forEach(prod => {

    const price = prod.masterVariant.prices![0];  

    price.discounted ? 
      checkPrice(price.discounted.value.centAmount)
      :
      checkPrice(price.value.centAmount);

  });

  return {min, max};

};

const getSizes = (prods: ProductProjection[]): number[] => {

  let sizes: number[] = [];
  
  prods.map(prod => sizes.push(...getSizeArray(prod)));

  sizes = sizes
    .filter((item, index) => sizes.indexOf(item) === index)
    .sort((a, b) => a - b);
  
  return sizes;

};

const CFilterMenu = ({ callback, prods }: { callback: Function, prods: ProductProjection[] } ) => {

  const {min, max} = getPriceRange(prods);
  const sizes = getSizes(prods);

  const [chosenSizes, setChosenSizes] = useState([]);
  const multiRange = useMultiRange(`${min}`, `${max}`);   

  return (
    <div className="filter_menu">
      <CRange {...multiRange}/>
      <CCheckboxArray array={sizes} setResult={setChosenSizes}/>
      <CButton 
        type="submit" 
        value="Submit" 
        clickHandler={() => callback({

          minPrice: multiRange.minRange,
          maxPrice: multiRange.maxRange,
          sizes: chosenSizes
      
        })}
      />
    </div>
  );

};

export default CFilterMenu;