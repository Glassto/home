import { updateSearchCount } from "./../appwrite";

export const API_BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchMovies = async (query = "") => {
  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/movie?language=en-EN&query=${query}&page=1&sort_by=year.asc`
      : `${API_BASE_URL}/discover/movie?&language=en-EN&sort_by=popularity.desc&page=1`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    if (query && data.results.length > 0) {
      await updateSearchCount(query, data.results[0]);
    }

    return data.results || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${movieId}?language=en-EN`,
      API_OPTIONS
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${movieId}/videos?language=en-EN`,
      API_OPTIONS
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie trailer");
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const fetchMovieCertification = async (movieId, country) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${movieId}/release_dates`,
      API_OPTIONS
    );

    const data = await response.json();
    for (const certification of data.results) {
      if (
        certification.iso_3166_1 === "US" ||
        certification.iso_3166_1 === country
      ) {
        return certification.release_dates[0];
      }
    }
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
