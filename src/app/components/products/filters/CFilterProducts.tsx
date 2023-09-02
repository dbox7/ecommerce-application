import { useState, FormEvent, memo } from 'react';

import { RiSearch2Line } from 'react-icons/ri';
import { BiCross } from 'react-icons/bi';

import './CFilterProducts.css';

const CFilterProducts = memo(({ callback }: { callback: Function }) => {

  const [search, setSearch] = useState('');

  const handleSearch = (e: FormEvent) => {

    e.preventDefault();
    callback({search: search, categoryId: undefined});
    
  };

  const closeSearchHandler = () => {

    setSearch('');
    callback({search: '', categoryId: undefined});

  };

  return (
    <div className="filter-container">
      <BiCross 
        className="close-icon"
        onClick={closeSearchHandler}
      />
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

});

export default CFilterProducts;
