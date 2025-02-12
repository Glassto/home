/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "./Modal.jsx";

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleOpen = (title) => {
    setSelectedTitle(title);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="movie-card" onClick={() => handleOpen(title)}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/movies/no-movie.png"
          }
          alt={title}
        />

        <div className="mt-4">
          <h3>{title}</h3>
        </div>

        <div className="content">
          <div className="rating">
            <img src="/movies/star.svg" alt="Star Icon" />
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

      {isOpen && (
        <Modal
          isOpen={isOpen}
          id={id}
          title={selectedTitle}
          poster_path={poster_path}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default MovieCard;
