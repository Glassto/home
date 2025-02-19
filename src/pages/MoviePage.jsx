import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Spinner from "../components/home/Spinner.jsx";
import MovieHeader from "../components/movie/MovieHeader.jsx";
import MovieMedia from "../components/movie/MovieMedia.jsx";
import MovieDetails from "../components/movie/MovieDetails.jsx";
import { fetchMovieDetails } from "../data/TMDB_get";

const MoviePage = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [movieData, setMovieData] = useState({});

  const getMovieData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const getMovieData = await fetchMovieDetails(params.id);

      if (getMovieData) {
        setMovieData(getMovieData);
        console.log("Movie Data:", getMovieData);
      } else
        throw new Error("Failed to fetch Movie data from fetchMovies function");
    } catch (error) {
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [params.id]);

  return (
    <div className="moviePage">
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="movieInfo">
          <MovieHeader movieData={movieData} params={params} />

          <MovieMedia movieData={movieData} params={params} />

          <MovieDetails movieData={movieData} />
        </div>
      )}
    </div>
  );
};

export default MoviePage;
