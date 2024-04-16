import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import defaultCover from "../assets/defaultCover.png";
import "./Home.css";

const fetchBooksBySubject = async (subject, setRecommendedBooks) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${subject}.json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const { works } = data;

    if (works) {
      const newBooks = works.slice(0, 6).map((bookSingle) => {
        const { cover_id, first_publish_year, title, authors } = bookSingle;

        return {
          id: cover_id,
          author: authors ? authors[0].name : "No Author",
          cover_img: cover_id,
          year: first_publish_year,
          title: title,
          subject: subject,
        };
      });
      setRecommendedBooks(newBooks);
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

const Home = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subjectFromUrl = searchParams.get("subject") || "fantasy";
  const state = location.state;

  useEffect(() => {
    let subject;
    if (state && state.subject) {
      subject = state.subject;
    } else if (subjectFromUrl) {
      subject = subjectFromUrl;
    } else {
      subject = "fantasy"; // Set subject to "fantasy" if undefined
    }
    fetchBooksBySubject(subject, setRecommendedBooks);
  }, [location.state, subjectFromUrl]);
  

  return (
    <main>
      <Navbar />
      <Outlet />
      <div className="home-container">
        <div className="banner-carousel">
          <Carousel autoPlay infiniteLoop interval={30000}>
            <div>
              <img src={banner1} alt="banner 1" />
            </div>
            <div>
              <img src={banner2} alt="banner 2" />
            </div>
            <div>
              <img src={banner3} alt="banner 3" />
            </div>
          </Carousel>
        </div>
        <div className="reccomendations">
          <h2>Recommended Books</h2>
        </div>
        <div className="book-carousel">
          <Carousel
            showThumbs={false}
            showIndicators={false}
            centerMode
            centerSlidePercentage={33}
          >
            {recommendedBooks.map((book) => (
              <div className="book" key={book.id}>
                <img
                  src={`http://covers.openlibrary.org/b/id/${book.cover_img}-L.jpg`}
                  alt={book.title}
                />
                <span className="book-title">{book.title}</span>
                <span>By {book.author}</span>
                <span>{book.subject}</span>
                <span>{book.year}</span>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </main>
  );
};

export default Home;
