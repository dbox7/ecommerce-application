import useMultiRange from '../../services/input/useMultiRange';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getSizeArray } from '../../utils/usefullFuncs';
import { useEffect, useState, memo, FC } from 'react';

import { useResize } from '../../services/useResize';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import CCheckboxArray from './checkboxArray/CCheckboxArray';
import CButton from '../button/CButton';
import CRange from '../inputs/range/CRange';

import { LuSettings2 } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';

import './CFiltersMenu.css';


const getPriceRange = (prods: ProductProjection[]) => {
  
  let minR = 1000;
  let maxR = 0;

  const checkPrice = (price: number) => {
    
    price = price / 100;
    
    minR = price < minR ? price : minR;
    maxR = price > maxR ? price : maxR;

  };

  prods.forEach(prod => {

    const price = prod.masterVariant.prices![0];  

    price.discounted ? 
      checkPrice(price.discounted.value.centAmount)
      :
      checkPrice(price.value.centAmount);

  });

  return {minR, maxR};

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

interface IFilterMenuProps {
  callback: Function
}

const CFilterMenu: FC<IFilterMenuProps> = memo(({ callback }) => {

  const { products } = useTypedSelector(state => state.products);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const [chosenSizes, setChosenSizes] = useState([]);
  const [chosenBrands, setChosenBrands] = useState([]);
  const multiRange = useMultiRange(`${min}`, `${max}`);

  const [hideFilterMenu, setHideFilterMenu] = useState(false);
  const [absolutePosition, setAbsolutePosition] = useState(false);
  const width = useResize();

  useEffect(() => {

    if (min === 0 && max === 0) {

      const {minR, maxR} = getPriceRange(products);

      setMin(minR);
      setMax(maxR);

    }
    
    setBrands(getBrands(products));
    setSizes(getSizes(products));

  }, []);

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
            
            if (absolutePosition) handleSettingClick();
            callback({

              minPrice: multiRange.minRange,
              maxPrice: multiRange.maxRange,
              sizes: chosenSizes,
              brands: chosenBrands
            
            });

          }}
        />
      </div>

      <div className={'filter-menu__popup ' + (hideFilterMenu ? 'hide' : '')} onClick={handleSettingClick}>
        <LuSettings2 className="filter-menu__icon" />
      </div>
    </>
  );

});

export default CFilterMenu;