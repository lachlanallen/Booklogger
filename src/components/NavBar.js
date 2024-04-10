import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./css/NavBar.css";
import logo from "../assets/logo.png";

const Navbar = () => {  
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/Home" className="navbar-link">Home</Link>
        <Link to="/" className="navbar-link">
          <img src={logo} alt="logo" className="navbar-logo" />
          <span>Booklogger</span>
        </Link>
        <Link to="/Search" className="navbar-link">Search For a Book</Link>
      </div>
    </nav>
  );
}

export default Navbar;