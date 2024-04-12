import React from "react";
import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import defaultCover from "../assets/defaultCover.png";
import './Home.css';

const Home = () => {
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
          <Carousel showThumbs={false} showIndicators={false} centerMode centerSlidePercentage={33}>
            <div className="book">
              <img src={defaultCover} alt="Book 1" />
              <span className="book-title">Book Title</span>
              <span>By Author</span>
              <span>Genre</span>
              <span>Publish Year</span>
            </div>
            <div className="book">
              <img src={defaultCover} alt="Book 2" />
              <span className="book-title">Book Title</span>
              <span>By Author</span>
              <span>Genre</span>
              <span>Publish Year</span>
            </div>
            <div className="book">
              <img src={defaultCover} alt="Book 3" />
              <span className="book-title">Book Title</span>
              <span>By Author</span>
              <span>Genre</span>
              <span>Publish Year</span>
            </div>
            <div className="book">
              <img src={defaultCover} alt="Book 4" />
              <span className="book-title">Book Title</span>
              <span>By Author</span>
              <span>Genre</span>
              <span>Publish Year</span>
            </div>
            <div className="book">
              <img src={defaultCover} alt="Book 5" />
              <span className="book-title">Book Title</span>
              <span>By Author</span>
              <span>Genre</span>
              <span>Publish Year</span>
            </div>
            <div className="book">
              <img src={defaultCover} alt="Book 6" />
              <span className="book-title">Book Title</span>
              <span>By Author</span>
              <span>Genre</span>
              <span>Publish Year</span>
            </div>
          </Carousel>
        </div>
      </div>
    </main>
  );
}

export default Home;