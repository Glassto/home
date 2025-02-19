/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchMovieCertification } from "../../data/TMDB_get";

const MovieHeader = ({ movieData, params }) => {
  const [movieCertification, setMovieCertification] = useState([]);

  const getMovieCertifications = async () => {
    if (movieData.origin_country) {
      const certification = await fetchMovieCertification(
        params.id,
        movieData.origin_country[0]
      );
      setMovieCertification(certification);
    } else setMovieCertification("N/A");
  };

  useEffect(() => {
    getMovieCertifications();
  }, [movieData]);

  return (
    <>
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
    </>
  );
};

export default MovieHeader;
