import { ISortProductsProps } from '../../../utils/types';

import './CSortProducts.css';

export function CSortProducts({filters, setFilters} : ISortProductsProps) {

  
  function sortItems(e: React.ChangeEvent<HTMLSelectElement>) {

    setFilters({...filters, sort: e.target.value});

  }
  
  return (

    <div className="sort-by-container">
      <label className="sort-by-label">Sort by:</label>
      <select className="sort-by-select" onChange={sortItems}>
        <option value="name.en asc">Name Ascending Sort</option>
        <option value="name.en desc">Name Descending Sort</option>
        <option value="price asc">Price Ascending Sort</option>
        <option value="price desc">Price Descending Sort</option>
      </select>
    </div>

  );

}
