import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm && (
        <button className="btn btn-outline-secondary" onClick={handleClear}>
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
