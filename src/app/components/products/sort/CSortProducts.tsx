import { Dispatch, SetStateAction, FC } from 'react';
import { IProductFilters } from '../../../utils/types';

import './CSortProducts.css';

interface ISortProductsProps {
  filters: IProductFilters
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}

export const CSortProducts: FC<ISortProductsProps> = ({ filters, setFilters }) => {

  
  function sortItems(e: React.ChangeEvent<HTMLSelectElement>) {

    setFilters({...filters, sort: e.target.value});

  }
  
  return (

    <div className="sort-by-container">
      <label className="sort-by-label">Sort by:</label>
      <div className="select-wrapper">
        <select className="sort-by-select" onChange={sortItems}>
          <option value="name.en asc">Name Ascending</option>
          <option value="name.en desc">Name Descending</option>
          <option value="price asc">Price Ascending</option>
          <option value="price desc">Price Descending</option>
        </select>
      </div>
    </div>

  );

};
