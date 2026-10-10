import React, { useState } from 'react';

function MySearchWidget({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (value) => {
    setQuery(value);
  };

  return (
    <div className="search-container">
<label htmlFor="search-input">Search articles</label>
      <input 
        type="text" 
        placeholder="Search articles..." 
        value={query}
        id="search-input"
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="search-btn" onClick={() => onSearch(query)}>
        <i className="fa fa-search" />
      </button>
    </div>
  );
}

export default MySearchWidget;










      {/* BAD INPUT: No associated label, relying solely on placeholder 
      BAD BUTTON: Using a <div> instead of a <button> for a clickable action */}