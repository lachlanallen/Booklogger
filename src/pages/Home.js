import React from "react";
import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}

export default Home;