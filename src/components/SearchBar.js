import React, { useRef } from 'react';
import "./Search.css";

const SearchBar = ({ setSearchQuery }) => {
  const searchRef = useRef('');

  const handleSearch = () => {
    setSearchQuery(searchRef.current.value);
  };

  return (
    <div class="search-bar">
      <input 
        type="text" 
        placeholder="Search entries..." 
        ref={searchRef}
        onChange={handleSearch} 
      />
    </div>
  );
};

export default SearchBar;
