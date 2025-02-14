import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { API_BASE_URL, API_OPTIONS } from "../data/TMDB_get";

const MoviePage = () => {
  const params = useParams();

  const [movieTrailerList, setMovieTrailerList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");

  const fetchMovies = async (query = "") => {
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?language=en-EN&query=${query}&page=1&sort_by=year.asc`
        : `${API_BASE_URL}/discover/movie?language=en-EN&sort_by=popularity.desc&page=1`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      if (!data.results) {
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const fetchMoviesTrailer = async () => {
    try {
      const endpoint = `${API_BASE_URL}/movie/${params.id}/videos?language=en-EN`;
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

  const getDataFromMovieList = () => {
    movieList.map((movie) => {
      if (movie.id === Number(params.id)) {
        setTitle(movie.title);
        setPosterPath(movie.poster_path);
      }
    });
  };

  console.log(title);
  console.log(posterPath);

  useEffect(() => {
    fetchMoviesTrailer();
    fetchMovies();
    curatedTrailerList();
  }, []);

  useEffect(() => {
    getDataFromMovieList();
  }, [movieList, params.id]);

  return (
    <div className="moviePage">
      <div className="modal ">
        <div className="flex justify-between items-center">
          <h2>{title}</h2>
          <Link to={"/home"}>
            <button>
              <p className="longText">Return to Homepage</p>
              <p className="shortText">Return</p>
              <img src="/home/arrow-right-tiny.svg" alt="" />
            </button>
          </Link>
        </div>

        <div className="media">
          <img
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w500/${posterPath}`
                : "/home/no-movie.png"
            }
            alt=""
          />
          <iframe
            sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
            className="video"
            src={`https://www.youtube.com/embed/${curatedTrailerList()}?fs=1`}
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
