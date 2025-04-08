import React from "react";

const Header = ({ searchTerm, setSearchTerm, toggleTheme }) => {
  // Handle input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-4 py-3 shadow-sm">
      <div className="container-fluid">
        {/* App Title */}
        <span className="navbar-brand fw-bold fs-4">📝 Note Keeper</span>

        {/* Search bar */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Optional Dark Mode Toggle */}
          <button
            className="btn btn-outline-secondary"
            onClick={toggleTheme}
            title="Toggle Light/Dark Mode"
          >
            <i className="bi bi-moon"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
