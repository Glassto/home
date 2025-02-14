/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router";
import Modal from "../pages/MoviePage.jsx";

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  return (
    <Link to={`/home/movie/${id}`}>
      <div className="movie-card" onClick={() => handleOpen(title)}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/home/no-movie.png"
          }
          alt={title}
        />

        <div className="mt-4">
          <h3>{title}</h3>
        </div>

        <div className="content">
          <div className="rating">
            <img src="/home/star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>

      {/* {isOpen && (
         <Modal
           isOpen={isOpen}
           id={id}
           title={selectedTitle}
           poster_path={poster_path}
           onClose={handleClose}
         />
       )} */}
    </Link>
  );
};

export default MovieCard;
