import React from "react";
import { Link } from "react-router-dom";
import "./css/BookList.css";

const Book = (book) => {
  return (
    <Link to = {`/books/${book.id}`}{... book}> 
    <div className="book-item">
      <div className="book-cover">
        <img src={book.cover_img} alt={book.title}/>
      </div>
      <div className="book-info">
        <Link to = {`/books/${book.id}`}{... book}/>
        <div className="book-title">
            <span>{book.title}</span>
        </div>
        <div className="book-author">
            <span>By </span>
            <span>{book.author}</span>
        </div>
        {/* Add one for genre */}
        <div className="book-publish">
            <span>{book.year}</span>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Book;