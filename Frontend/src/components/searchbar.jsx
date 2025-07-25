import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import './searchbar.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
    if (term.trim().length >= 2) {
      onSearch(term.trim());
    }
  };

  return (
    <form className="search-form display-flex flex-center align-center gap-1 width-1 mg-1" onSubmit={e => e.preventDefault()}>
      <div className="search-container relative width-1">
        <span className="search-icon"><CiSearch /></span>
        <input
          type="text"
          placeholder="Buscar jugadores"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
          autoComplete="off"
        />
      </div>
    </form>
  );
};

export default SearchBar;