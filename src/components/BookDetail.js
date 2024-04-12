import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Loading from "./Loader";
import NavBar from "./NavBar";
import './css/BookDetail.css';
import defaultCover from "../assets/defaultCover.png";

const URL = "https://openlibrary.org/works/";

const BookDetail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        
        if(data){
          const {description, title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            description: description ? description.value : "No description available",
            title: title ? title : "No title available",
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : defaultCover,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places available",
            subject_times: subject_times ? subject_times.join(", ") : "No subject times available",
            subjects: subjects ? subjects.join(", ") : "No subjects available"
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

  if(loading) {
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
          <button type='button' className="back-btn" onClick={() => navigate("/books")}>
            <i className="fas fa-arrow-left"/> 
            <span>Back to list</span>
          </button>
          <div className="book-details-content">
            <div className="book-details-cover">
              <img src={book?.cover_img} alt={book.title} />
            </div>
            <div className="book-details-info">
              <div className="book-details-title">
                <span>{book?.title}</span>
              </div>
              <div className="book-details-description">
                <span>{book?.description}</span>
              </div>
              <div className="book-details-subjects">
                <span>Subjects:</span>
                <span>{book?.subjects}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
}

export default BookDetail;