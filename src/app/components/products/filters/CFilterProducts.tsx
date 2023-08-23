import { RiSearch2Line } from 'react-icons/ri';
import { IFiltersProps } from '../../../utils/types';
import { useState, FormEvent} from 'react';


import './CFilterProducts.css';

export function CFilterProducts({ filters, setFilters }: IFiltersProps) {

  const [search, setSearch] = useState(filters.search);

  const handleSearch = (e: FormEvent) => {

    e.preventDefault();
    setFilters({...filters, search: search});
    
  
  };

  return (
    <div className="filter-container">
      <div className="filter-search-container">
        <form 
          className="filter-search" 
          onSubmit={ handleSearch }
        >
          <input 
            type="text" 
            name="search"
            placeholder="Search..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
          <button 
            type="submit"
            className="search-btn"
          >
            <RiSearch2Line className="search-icon"/>
          </button>
        </form>
      </div>

    </div>
  );

}
