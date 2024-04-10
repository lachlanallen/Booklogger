import React from "react";
import { useGlobalContext } from "../context";
import Book from "./Book";
import Loading from "./Loader";
import defaultCover from "../assets/defaultCover.png";
import "./css/BookList.css";

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const {books, loading, resultTitle} = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      //Remove '/works/' from the id
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : defaultCover
    }
  });

  console.log(booksWithCovers);

  if(loading) {
    return <Loading />;
  }

  return (
    <section className="booklist">
      <div className="booklist-container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content">
          {
            booksWithCovers.slice(0, 30).map((item, index)=> {
              return (
                <Book key = {index} {... item}/>
              );
            })
          }
        </div>
      </div>
      
    </section>
    
  );
}

export default BookList;