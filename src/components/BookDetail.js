import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loader";
import NavBar from "./NavBar";
import Comment from "./Comment";
import "./css/BookDetail.css";
import defaultCover from "../assets/defaultCover.png";

const URL = "https://openlibrary.org/works/";

const BookDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        console.log(`Fetching book details for ID: ${id}`);
        console.log(`Constructed URL: ${URL}${id}.json`);

        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const { description, title, covers, authors, subjects } = data;
          let authorNames = "No author available";

          if (authors && authors.length > 0) {
            const authorPromises = authors.map((author) =>
              fetch(`https://openlibrary.org${author.author.key}.json`).then(
                (res) => res.json()
              )
            );
            const authorData = await Promise.all(authorPromises);
            authorNames = authorData.map((author) => author.name).join(", ");
          }

          const newBook = {
            description: description ? description : "No description available",
            title: title ? title : "No title available",
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : defaultCover,
            subjects: subjects
              ? subjects.slice(0, 2).join(", ")
              : "No subjects available",
            author: authorNames,
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book", error);
        setBook(null);
      }
      setLoading(false);
    }
    getBookDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!book) {
    return <div>No book details available</div>;
  }

  return (
    <div>
      <NavBar />
      <section className="book-detail">
        <div className="book-detail-container">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/Search")}
          >
            <i className="fas fa-arrow-left" />
            <p>Back</p>
          </button>
          <div className="book-details-content">
            <div className="book-details-cover">
              <img src={book?.cover_img} alt={book.title} />
            </div>
            <div className="book-details-info">
              <div className="book-details-title">
                <span>{book?.title}</span>
              </div>
              <div className="book-details-author">
                <span>By </span>
                <span>
                  {Array.isArray(book?.author)
                    ? book.author.join(", ")
                    : book?.author}
                </span>
              </div>
              <div className="book-details-subjects">
                <span>{book?.subjects}</span>
              </div>
              <div className="book-details-description">
                <span>
                  {typeof book?.description === "object"
                    ? book?.description.value
                    : book?.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Comment />
    </div>
  );
};

export default BookDetail;
