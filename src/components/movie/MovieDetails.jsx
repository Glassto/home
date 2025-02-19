/* eslint-disable react/prop-types */
import React from "react";
import MovieDates from "./../../data/MovieDates";

const MovieDetails = ({ movieData }) => {
  return (
    <div className="movieDetails space-y-2.5">
      <div className="genre">
        <h3>Genres</h3>
        <div className="genres">
          <ul className="flex gap-2 text-white ">
            {movieData.genres ? (
              movieData.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))
            ) : (
              <li>N/A</li>
            )}
          </ul>

          <ul className="flex justify-center gap-2">
            <li>
              <div className="rating flex w-max items-center gap-1 py-1.5">
                <img src="/home/star.svg" alt="aa" />
                <p>
                  {movieData.vote_average
                    ? movieData.vote_average.toFixed(1)
                    : "N/A"}
                  <span className="text-indigo-300/60">
                    /10 ({movieData.vote_count ? movieData.vote_count : "N/A"})
                  </span>
                </p>
              </div>
            </li>
            <li>
              <div className="rating flex w-max items-center gap-3 py-1.5">
                <img src="/home/popularity.svg" alt="aa" />
                <p className="text-indigo-300/60">
                  {movieData.popularity
                    ? Math.round(movieData.popularity)
                    : "N/A"}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="overview flex gap-5">
        <h3>Overview</h3>
        <p className="overviewText">
          {movieData.overview ? movieData.overview : movieData.tagline}
        </p>
      </div>

      <hr className="h-[0.75px] my-8 w-full border-0 dark:bg-modal-light"></hr>

      <div className="release flex gap-5">
        <h3>Release Date</h3>
        <p className="overviewText">
          {movieData.release_date ? (
            <MovieDates release_date={movieData.release_date} />
          ) : (
            "N/A"
          )}
        </p>
      </div>

      <div className="countries flex gap-5">
        <h3>Countries</h3>
        <ul className="overviewText flex flex-wrap gap-1">
          {movieData.production_countries
            ? movieData.production_countries.map((country, i) => {
                return (
                  <li
                    className="after:content-['·'] last:after:content-none"
                    key={i}
                  >
                    {` ${country.name} `}
                  </li>
                );
              })
            : null}
        </ul>
      </div>

      <div className="status flex gap-5">
        <h3>Status</h3>
        <p className="overviewText">
          {movieData.status ? movieData.status : "N/A"}
        </p>
      </div>

      <div className="languages flex gap-5">
        <h3>Languages</h3>
        <ul className="overviewText flex flex-wrap gap-1">
          {movieData.spoken_languages
            ? movieData.spoken_languages.map((language, i) => {
                return (
                  <li
                    className="after:content-['·'] last:after:content-none"
                    key={i}
                  >
                    {`${language.english_name} `}
                  </li>
                );
              })
            : null}
        </ul>
      </div>

      <div className="budget flex gap-5">
        <h3>Budget</h3>
        <ul className="overviewText">
          {movieData.budget ? (
            <li>${movieData.budget / 1000000} Million</li>
          ) : (
            "N/A"
          )}
        </ul>
      </div>

      <div className="revenue flex gap-5">
        <h3>Revenue</h3>
        <ul className="overviewText">
          {movieData.revenue ? (
            <li>${Math.round(movieData.revenue / 1000000)} Million</li>
          ) : (
            "N/A"
          )}
        </ul>
      </div>

      <div className="tagline flex gap-5">
        <h3>Tagline</h3>
        <p className="overviewText">
          {movieData.tagline ? movieData.tagline : "N/A"}
        </p>
      </div>

      <div className="companies flex gap-5">
        <h3>Companies</h3>
        <ul className="overviewText flex flex-wrap gap-1">
          {movieData.production_companies
            ? movieData.production_companies.map((company, i) => {
                if (i <= 1) {
                  return (
                    <li
                      className="after:content-['·'] last:after:content-none"
                      key={i}
                    >
                      {`${company.name} `}
                    </li>
                  );
                }
                return null;
              })
            : null}
        </ul>
      </div>

      <hr className="h-[0.75px] mt-8 w-full border-0 dark:bg-modal-light"></hr>
    </div>
  );
};

export default MovieDetails;
