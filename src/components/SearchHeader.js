import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/SearchHeader.css";


const SearchHeader = () => {
  return (
    <div className="search-header">
      <div>
        <div className="search-content">
          <h1 className="search-title">Start Searching for a Book.</h1>
          <form className="search-form">
            <input type="text" placeholder="Search for a book ..." />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass submit-icon"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchHeader;