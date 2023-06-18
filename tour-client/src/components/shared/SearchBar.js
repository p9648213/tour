"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ onSearchSubmit, defaultSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (searchTerm !== defaultSearchTerm) {
      setSearchTerm(defaultSearchTerm);
    }
  }, [defaultSearchTerm]);

  return (
    <div className="search">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Search by tour name"
          autoComplete="new-password"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <button
          className="search-icon-container"
          onClick={() => onSearchSubmit(searchTerm)}
        >
          <span className="search-icon">&#9906;</span>
        </button>
      </div>
    </div>
  );
}
