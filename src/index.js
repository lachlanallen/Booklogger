import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";
import "./index.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
