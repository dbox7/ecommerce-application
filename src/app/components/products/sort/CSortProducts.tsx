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

  return (

    <>
      <div className={ 'sort-by ' + (filters.sort === type ? 'active' : '') } onClick={handleClick}>
        {type}
        { filters.sort === type && filters.sortOrder ? 
          <IoIosArrowUp 
            className="arrow-down-icon"/> 
          : 
          <IoIosArrowDown 
            className="arrow-up-icon"/> }
      </div>
    </>

  );

}
