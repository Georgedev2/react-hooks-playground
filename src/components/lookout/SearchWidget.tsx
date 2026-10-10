import React, { useState } from 'react';

function SearchWidget({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      {/* GOOD INPUT: Explicitly linked label using htmlFor and id */}
      <div className="input-group">
        <label htmlFor="search-input">Search articles</label>
        <input 
          id="search-input"
          type="text" 
          placeholder="e.g., React accessibility" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* GOOD BUTTON: Native <button> element with an accessible name */}
      <button type="submit" aria-label="Search">
        {/* Decorative icon hidden from screen readers */}
        <i className="fa fa-search" aria-hidden="true" />
      </button>
    </form>
  );
}

export default SearchWidget;


