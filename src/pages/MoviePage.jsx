import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";
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

  const [movieData, setMovieData] = useState([]);
  const [movieCertification, setMovieCertification] = useState([]);

  const getMovieData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const getMovieData = await fetchMovieDetails(params.id);

      if (getMovieData) {
        setMovieData(getMovieData);
        console.log(getMovieData);
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
    const certification = await fetchMovieCertification(params.id);
    setMovieCertification(certification);

    console.log(certification);
  };

  const curatedTrailerList = () => {
    for (const video of movieTrailerList) {
      if (
        video.name.includes("Official Trailer") ||
        video.name.includes("Trailer")
      ) {
        return video.key;
      }
    }

    return null;
  };

  useEffect(() => {
    getMovieData();
    getMovieCertifications();
  }, [params.id]);

  return (
    <div className="moviePage">
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="movieInfo">
          <div className="movieHeader">
            <h2>{movieData.title}</h2>
            <Link to={"/home"}>
              <button>
                <p className="longText">Return to Homepage</p>
                <p className="shortText">Return</p>
                <img src="/home/arrow-right-tiny.svg" alt="" />
              </button>
            </Link>
          </div>

          <div className="movieOverallDetails">
            <p>
              {movieData.release_date
                ? movieData.release_date.split("-")[0]
                : "N/A"}
            </p>
            <p>•</p>
            <p>
              {movieCertification && movieCertification.certification
                ? movieCertification.certification
                : "N/A"}
            </p>
            <p>•</p>
            <p>
              {Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}m
            </p>
          </div>

          <div className="media">
            <img
              src={
                movieData.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                  : "/home/no-movie.png"
              }
              alt=""
            />
            <iframe
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              className="video"
              src={`https://www.youtube.com/embed/${curatedTrailerList()}?fs=1`}
              allowFullScreen
            ></iframe>
          </div>

          <div className="movieDetails"></div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
