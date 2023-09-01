import { ISortProductsProps } from '../../../utils/types';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import './CSortProducts.css';

export function CSortProducts({filters, setFilters, type} : ISortProductsProps) {

  const handleClick = () => {

    if (filters.sort === type) {

      setFilters({...filters, sortOrder: !filters.sortOrder});
    
    } else {

      setFilters({...filters, sort: type, sortOrder: false});
    
    }

  };

  console.log(`render ${CSortProducts.name}`);

  return (

    <>
      <div className={ 'sort-by ' + (filters.sort === type ? 'active' : '') } onClick={handleClick}>
        {type}
        { filters.sort === type && filters.sortOrder ? 
          <IoIosArrowDown 
            className="arrow-down-icon"/> : 
          <IoIosArrowUp 
            className="arrow-up-icon"/> }
      </div>
    </>

  );

}
