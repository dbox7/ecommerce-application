import { useState, FormEvent, memo } from 'react';

import { BiSearch } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import './CSearch.css';

const CSearch = memo(({ callback }: { callback: Function }) => {

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
      <RxCross2 
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
        </form>
      </div>
      <button 
        type="submit"
        className="search-btn"
        onClick={handleSearch}
      >
        <BiSearch className="search-icon"/>
      </button>
    </div>
  );

});

export default CSearch;
