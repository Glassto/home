/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Modal = ({ isOpen, id, title, poster_path, onClose }) => {
  if (!isOpen) return null;

  const [movieTrailerList, setMovieTrailerList] = useState([]);
  const [trailerLink, setTrailerLink] = useState("");

  const curatedTrailerList = () => {
    for (const video of movieTrailerList) {
      if (video.name.includes("Official Trailer" && "Trailer")) {
        return video.key;
      }
    }

    return null;
  };
  curatedTrailerList();

  const fetchMoviesTrailer = async () => {
    try {
      const endpoint = `${API_BASE_URL}/movie/${id}/videos?language=en-EN`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.Response === "false") {
        throw new Error(data.error || "Failed to fetch data");
      }

      setMovieTrailerList(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMoviesTrailer();
  }, [isOpen]);

  return (
    <div className="modal">
      <div className="flex justify-between items-center">
        <h2>{title}</h2>
        <button onClick={onClose}>
          <p>Return to Homepage</p>
          <img src="/movies/arrow-right-tiny.svg" alt="" />
        </button>
      </div>

      <div className="media">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/movies/no-movie.png"
          }
          alt=""
        />
        <iframe
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
          className="video"
          src={`https://www.youtube.com/embed/${curatedTrailerList()}`}
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;
