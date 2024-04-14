import React from "react";
import { Link } from "react-router-dom";
import "./css/BookList.css";

const Book = ({ id, cover_img, title, author, year, subject }) => {
  console.log(cover_img);
  return (
    <div>
      <Link to={`/books${id}`}> 
        <div className="book-item">
          <div className="book-cover">
            <img src={cover_img} alt={title}/>
          </div>
          <div className="book-info">
            <Link to={`/books${id}`}/>
            <div className="book-title">
                <span>{title}</span>
            </div>
            <div className="book-author">
                <span>By </span>
                <span>{author}</span>
            </div>
            <div className="book-subject">
                <span>{subject}</span>
            </div>
            <div className="book-publish">
                <span>{year}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Book;