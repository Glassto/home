/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

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

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?language=ro-RO&query=${query}&page=1`
        : `${API_BASE_URL}/discover/movie?language=ro-RO&sort_by=popularity.desc&page=1`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      if (data.Response === "false") {
        setErrorMessage(data.Error || "Failed to fetch data");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`${error}`);
      setErrorMessage(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

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
    } finally {
      setIsLoadingTrending(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
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
              src="movies/glassto - light.svg"
              alt=""
            />
            <h2 className="text-xl text-[#DDC6B6]">Glassto</h2>
          </div>
          <img src="movies/hero-img.png" alt="image.png" />
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
                  <li key="movie.$id">
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
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
