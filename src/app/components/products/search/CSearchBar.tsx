import { useState } from 'react';
import { SearchBarProps } from '../../../utils/types';
import { RiSearch2Line } from 'react-icons/ri';
import './CSearchBar.css';

export const CSearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

  const [query, setQuery] = useState('');

  const handleSearch = () => {

    onSearch(query);
    setQuery('');

  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        name="search"
        placeholder="Search.." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}/>
      <button 
        type="submit" 
        className="search-btn"
        onClick={handleSearch}><RiSearch2Line className="search-icon"/></button>
    </div>
  );

};