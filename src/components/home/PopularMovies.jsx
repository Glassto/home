/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";
import { useDebounce } from "react-use";
import { fetchMovies } from "../../data/TMDB_get.js";

const PopularMovies = ({ searchTerm }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const getMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const movies = await fetchMovies(debouncedSearchTerm);

      setMovieList(movies);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [debouncedSearchTerm]);

  return (
    <section className="all-movies">
      <h2>All Movies</h2>

      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ul>
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PopularMovies;
