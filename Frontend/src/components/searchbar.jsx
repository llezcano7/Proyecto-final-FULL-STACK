import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import './searchbar.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-form display-flex flex-center align-center gap-1 width-1 mg-1" onSubmit={handleSubmit}>
      <div className="search-container  relative width-1">
        <span className="search-icon"><CiSearch /></span>
        <input
          type="text"
          placeholder="Buscar jugadores"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <button type="submit" className="search-button">Buscar</button>
    </form>
  );
};
export default SearchBar;