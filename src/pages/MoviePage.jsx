import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Spinner from "../components/home/Spinner.jsx";
import MovieHeader from "../components/movie/MovieHeader.jsx";
import MovieMedia from "../components/movie/MovieMedia.jsx";
import MovieDetails from "../components/movie/MovieDetails.jsx";
import {
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchMovieCertification,
} from "../data/TMDB_get";

const MoviePage = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [movieTrailerList, setMovieTrailerList] = useState([]);

  const [movieData, setMovieData] = useState({});
  const [movieCertification, setMovieCertification] = useState([]);

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

      const trailers = await fetchMovieTrailer(params.id);

      if (trailers) {
        setMovieTrailerList(trailers);
      } else
        throw new Error(
          "Failed to fetch Trailers data from fetchMovies function"
        );
    } catch (error) {
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getMovieCertifications = async () => {
    if (movieData.origin_country) {
      const certification = await fetchMovieCertification(
        params.id,
        movieData.origin_country[0]
      );
      setMovieCertification(certification);

      console.log(certification);
    } else setMovieCertification("N/A");
  };

  useEffect(() => {
    getMovieData();
  }, [params.id]);

  useEffect(() => {
    getMovieCertifications();
  }, [movieData]);

  return (
    <div className="moviePage">
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="movieInfo">
          <MovieHeader
            movieData={movieData}
            movieCertification={movieCertification}
          />

          <MovieMedia
            movieData={movieData}
            movieTrailerList={movieTrailerList}
          />

          <MovieDetails movieData={movieData} />
        </div>
      )}
    </div>
  );
};

export default MoviePage;
