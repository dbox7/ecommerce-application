import { useState } from 'react';
import { SearchBarProps } from '../../../utils/types';
import './CSearchBar.css';

export const CSearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

  const [query, setQuery] = useState('');

  const handleSearch = () => {

    onSearch(query);
    
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search.." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="search" />
      <button 
        type="submit" 
        className="search-btn"
        onClick={handleSearch}>yes!</button>
    </div>
  );

};