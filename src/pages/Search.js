import React, { useState } from 'react';
import Navbar from "../components/NavBar";
import SearchHeader from "../components/SearchHeader";
import { Outlet } from "react-router-dom";

function Search() {
    return (
       <main>
            <Navbar />
            <SearchHeader/>
            <Outlet />
        </main>
    );
}

export default Search;
