import React from "react";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import Book from "./Book";
import Loading from "./Loader";
import defaultCover from "../assets/defaultCover.png";
import "./css/BookList.css";

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const { books, loading } = useGlobalContext();
  const [booksWithCovers, setBooksWithCovers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(booksWithCovers.length / 8);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  useEffect(() => {
    const fetchImages = async () => {
      const newBooksWithCovers = await Promise.all(
        books.map(async (book) => {
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
        })
      );
      setBooksWithCovers(newBooksWithCovers);
    };
    fetchImages();
  }, [books]);

  console.log(booksWithCovers);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="booklist">
      <div className="booklist-container">
        <div className="section-title">
          <h2>Search Results</h2>
        </div>
        <div className="booklist-content">
          {booksWithCovers
            .slice(currentPage * 8, (currentPage + 1) * 8)
            .map((book, index) => (
              <Book key={index} {...book} />
            ))}
        </div>
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number - 1)}
            className={currentPage + 1 === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BookList;
