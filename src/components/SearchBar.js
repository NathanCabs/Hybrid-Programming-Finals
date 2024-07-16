import React, { useRef } from 'react';

const SearchBar = ({ setSearchQuery }) => {
  const searchRef = useRef('');

  const handleSearch = () => {
    setSearchQuery(searchRef.current.value);
  };

  return (
    <div>
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
