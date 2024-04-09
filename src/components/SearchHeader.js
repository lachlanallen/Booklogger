import React from "react";

const SearchHeader = () => {
  return (
    <div className="header">
      <h1>Start Searching for a Book.</h1>
      <div className="search">
        <button><i class="fa-solid fa-magnifying-glass"></i></button>
        <input
          type="text"
          placeholder="Search for a book..."
        />
        {/* <button onClick={handleSearch}>Search</button>
        {/* Display search results here */}
      </div>
    </div>
  );
}

export default SearchHeader;