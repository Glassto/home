/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { fetchMovieTrailer } from "../../data/TMDB_get";

const MovieMedia = ({ movieData, params }) => {
  const [movieTrailerList, setMovieTrailerList] = useState([]);

  const getMovieTrailer = async () => {
    const trailers = await fetchMovieTrailer(params.id);

    if (trailers) {
      setMovieTrailerList(trailers);
    } else
      throw new Error(
        "Failed to fetch Trailers data from fetchMovies function"
      );
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
    getMovieTrailer();
  }, [params.id]);

  return (
    <div className="media">
      <img
        src={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
            : "/home/no-movie.png"
        }
        alt=""
      />

      <a href={`https://www.youtube.com/watch?v=${curatedTrailerList()}`}>
        <button className="trailer-button">Watch Trailer</button>
      </a>

      <iframe
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        className="video"
        src={`https://www.youtube.com/embed/${curatedTrailerList()}?fs=1`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieMedia;
