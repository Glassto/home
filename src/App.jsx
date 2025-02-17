/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import { API_BASE_URL, API_OPTIONS, fetchMovies } from "./data/TMDB_get";
import { Link } from "react-router";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [errorMessageTrending, setErrorMessageTrending] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchTrendingMovies = async () => {
    setIsLoadingTrending(true);
    setErrorMessageTrending("");

    try {
      const movies = await getTrendingMovies();

      if (!movies) {
        throw new Error("Failed to fetch data from Database");
      }

      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
      setErrorMessageTrending(error.message);
    } finally {
      setIsLoadingTrending(false);
    }
  };

  const getMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const movies = await fetchMovies(debouncedSearchTerm);

      if (!movies) {
        throw new Error("Failed to fetch data from fetchMovies function");
      }

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

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

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

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending</h2>

            {isLoadingTrending ? (
              <Spinner />
            ) : errorMessageTrending ? (
              <p>{errorMessageTrending}</p>
            ) : (
              <ul>
                {trendingMovies.map((movie, index) => (
                  <Link
                    key={movie.$id || index}
                    to={`/home/movie/${movie.movie_id}`}
                  >
                    <li>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="all-movies">
          <h2>Popular</h2>

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
      </div>
    </main>
  );
};

export default App;
