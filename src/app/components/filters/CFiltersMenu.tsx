import useMultiRange from '../../services/input/useMultiRange';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getSizeArray } from '../../utils/useFullFuncs';
import { useEffect, useState } from 'react';

import CCheckboxArray from './checkboxArray/CCheckboxArray';
import CButton from '../button/CButton';
import CRange from '../inputs/range/CRange';

import { LuSettings2 } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';

import './CFiltersMenu.css';
import { useResize } from '../../services/useResize';

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

const getSizes = (prods: ProductProjection[]): string[] => {

  let sizes: string[] = [];
  
  prods.forEach(prod => sizes.push(...getSizeArray(prod)));

  sizes = sizes
    .filter((item, index) => sizes.indexOf(item) === index)
    .sort((a, b) => Number(a) - Number(b));
  
  return sizes;

};

const getBrands = (prods: ProductProjection[]) => {
  
  const res: Set<string> = new Set();

  prods.forEach((prod) => {

    res.add(prod
      .masterVariant
      .attributes!
      .find(attr => attr.name === 'Brand')
      ?.value
      .key
    );
  
  });

  return Array.from(res);

};

const CFilterMenu = ({ callback, prods }: { callback: Function, prods: ProductProjection[] } ) => {

  const {min, max} = getPriceRange(prods);
  const sizes: string[] = getSizes(prods);
  const brands: string[] = getBrands(prods);
  
  const [chosenSizes, setChosenSizes] = useState([]);
  const [chosenBrands, setChosenBrands] = useState([]);
  const multiRange = useMultiRange(`${min}`, `${max}`);

  const [hideFilterMenu, setHideFilterMenu] = useState(false);
  const [absolutePosition, setAbsolutePosition] = useState(false);
  const width = useResize();

  const handleSettingClick = () => {

    setHideFilterMenu(!hideFilterMenu);
    setAbsolutePosition(!absolutePosition);

    document.body.style.overflow = !hideFilterMenu ? 'hidden' : '';
    
  };

  useEffect(() => {

    if (width >= 700) {

      setHideFilterMenu(true);

    } else {

      setHideFilterMenu(false);
      setAbsolutePosition(false);
      
    }
      
  }, [width]);

  return (
    <>
      <div className={absolutePosition ? 'backplate' : 'hide'} onClick={handleSettingClick}>
        <RxCross2 className="backplate__cross"/>
      </div>

      <div className={'filter-menu substrate ' + (absolutePosition ? 'absolute ' : '') + (!hideFilterMenu ? 'hide' : '')}>
        <div className="filter-menu__title">Filters</div>
        <div className="filter-menu__sub-title">Price</div>
        <CRange {...multiRange}/>
        <div className="filter-menu__sub-title">Sizes</div>
        <CCheckboxArray array={sizes} setResult={setChosenSizes}/>
        <div className="filter-menu__sub-title">Brands</div>
        <CCheckboxArray array={brands} setResult={setChosenBrands}/>
        <CButton 
          type="submit" 
          value="Submit" 
          extraClass="filter-menu__btn"
          clickHandler={() => {
            
            handleSettingClick();
            callback({

              minPrice: multiRange.minRange,
              maxPrice: multiRange.maxRange,
              sizes: chosenSizes,
              brands: chosenBrands
            
            });

          }}
        />
      </div>

      <div className={'filter-menu__popup' + (hideFilterMenu ? 'hide' : '')} onClick={handleSettingClick}>
        <LuSettings2 className="filter-menu__icon" />
      </div>
    </>
  );

};

export default CFilterMenu;