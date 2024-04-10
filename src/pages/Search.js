import React, { useState } from 'react';
import Navbar from "../components/NavBar";
import SearchHeader from "../components/SearchHeader";
import { Outlet } from "react-router-dom";
import Book from '../components/Book';
import BookList from '../components/BookList';
import { useGlobalContext } from "../context";

function Search() {
    return (
       <main>
            <Navbar />
            <SearchHeader/>
            <BookList />
            <Outlet />
        </main>
    );
}

export default Search;
