import React, {useState, useRef, useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context";
import BookList from './BookList';
import "./css/SearchHeader.css";


const SearchHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultTitle, setResultTitle] = useState("");
  const searchValue = useRef('');

  useEffect(() => searchValue.current.focus(), []);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    let tempSearchValue = searchValue.current.value.trim();
    if((tempSearchValue.replace(/[^\w\s]/gi, "")).length === 0) {
      setSearchTerm("The Hobbit");
      setResultTitle("Please enter a valid search term.");
    } else {
      setSearchTerm(searchValue.current.value);
    }
  };


  return (
    <div className="search-header">
      <div>
        <div className="search-content">
          <h1 className="search-title">Start Searching for a Book.</h1>
          <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search for a book ..." ref={searchValue}/>
            <button type="submit" onClick={handleSubmit}>
              <i className="fa-solid fa-magnifying-glass submit-icon"></i>
            </button>
          </form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SearchHeader;