import { useState, FormEvent, memo, FC } from 'react';

import { BiSearch } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import styles from './CSearch.module.css';

interface ISearchProps {
  callback: Function
}

const CSearch: FC<ISearchProps> = memo(({ callback }) => {

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
    <div className={styles['filter-container']}>
      <RxCross2 
        className={styles['close-icon']}
        onClick={closeSearchHandler}
      />
      <div className={styles['filter-search-container']}>
        <form 
          className={styles['filter-search']} 
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
        className={styles['search-btn']}
        onClick={handleSearch}
      >
        <BiSearch className={styles['search-icon']}/>
      </button>
    </div>
  );

});

export default CSearch;
