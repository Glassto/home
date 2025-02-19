/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Search from "./components/home/Search.jsx";
import TrendingMovies from "./components/home/TrendingMovies.jsx";
import PopularMovies from "./components/home/PopularMovies.jsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <div className="flex justify-center items-center gap-4">
            <img
              className="h-6 w-auto m-0"
              src="/home/glassto - light.svg"
              alt=""
            />
            <h2 className="text-xl text-[#DDC6B6]">Glassto</h2>
          </div>
          <img src="/home/hero-img.png" alt="image.png" />
          <h1>
            Find{" "}
            <span className="text-gradient subpixel-antialiased font-[1000]">
              Movies
            </span>{" "}
            You'll Enjoy, Without Problems
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <TrendingMovies />
        <PopularMovies searchTerm={searchTerm} />
      </div>
    </main>
  );
};

export default App;
