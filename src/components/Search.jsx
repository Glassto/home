import React from "react";

const Search = (prop) => {
  return (
    <main>
      <div className="search">
        <div>
          <img src="search.svg" alt="search" />
          <input
            type="text"
            placeholder="Search through thousands the movies"
            value={prop.searchTerm}
            onChange={(e) => prop.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
};

export default Search;
