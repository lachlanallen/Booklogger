import React, {useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import "./css/SearchHeader.css";


const SearchHeader = () => {
  const {setSearchTerm, setResultTitle} = useGlobalContext();
  const searchValue = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchValue.current.focus(), []);
  const handleSubmit = (event) => {
   event.preventDefault(); 
   let tempSearchValue = searchValue.current.value.trim();
   if((tempSearchValue.replace(/[^\w\s]/gi, "")).length === 0) {
    setSearchTerm("Harry Potter");
    setResultTitle("Please enter a valid search term.");
  }else{
    setSearchTerm(searchValue.current.value);
  }

  navigate('/books');
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
    </div>
  );
}

export default SearchHeader;