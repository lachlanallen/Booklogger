import React from "react";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import Book from "./Book";
import { Link } from "react-router-dom";
import Loading from "./Loader";
import defaultCover from "../assets/defaultCover.png";
import "./css/BookList.css";

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const {books, loading, resultTitle} = useGlobalContext();
  const [booksWithCovers, setBooksWithCovers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const newBooksWithCovers = await Promise.all(books.map(async (book) => {
        let cover_img = defaultCover;
        if (book.covers && book.covers.length > 0) {
          const url = `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
          try {
            const response = await fetch(url);
            if (response.ok) {
              cover_img = url;
            }
          } catch (error) {
            console.error(`Failed to load image: ${url}`);
          }
        }
        return { ...book, cover_img };
      }));
      setBooksWithCovers(newBooksWithCovers);
    };
    fetchImages();
  }, [books]);

  console.log(booksWithCovers);
  

  if(loading) {
    return <Loading />;
  }

  const handlePrevPage = () => {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((oldPage) => Math.min(oldPage + 1, Math.ceil(booksWithCovers.length / 8) - 1));
  };

  return (
    <section className="booklist">
      <div className="booklist-container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content">
        {booksWithCovers.slice(currentPage * 8, (currentPage + 1) * 8).map((book, index) => (
            <Book key={index} {...book} />
          ))}
        </div>
      </div>
      <div className="pagination">
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
      </div>
    </section>
  );
}

export default BookList;