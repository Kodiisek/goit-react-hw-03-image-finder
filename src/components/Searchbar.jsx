import React, { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
