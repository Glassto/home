import React, { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";
import { getTrendingMovies } from "../appwrite.js";
import { Link } from "react-router";

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [errorMessageTrending, setErrorMessageTrending] = useState("");

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

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default TrendingMovies;
