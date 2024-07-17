import React, { useRef } from 'react';
import "./Search.css";

const SearchBar = ({ setSearchQuery }) => {
  const searchRef = useRef(''); // Reference for search input field

  // Handles the search input
  const handleSearch = () => {
    setSearchQuery(searchRef.current.value); // Update search query
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
