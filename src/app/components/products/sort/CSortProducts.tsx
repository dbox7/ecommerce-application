import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './CSortProducts.css';

interface ISortProductsProps {
  type: 'name' | 'price'
  filters: any,
  setFilters: any
}

export function CSortProducts({filters, setFilters, type} : ISortProductsProps) {

  const handleClick = () => {

    console.log('handleClick');

    if (filters.sort === type) {

      // flip sortOrder
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
            className="arrow-up-icon"/> : 
          <IoIosArrowDown 
            className="arrow-down-icon"/> }
      </div>
    </>

  );

}
