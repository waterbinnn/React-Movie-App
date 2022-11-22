import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllMovies,
  getAllShows,
  removeMovieOrShow,
} from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import { Settings } from '../../common/settings';
import './MovieListing.scss';

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  const dispatch = useDispatch();

  const term = useSelector((state) => state.movies.term);

  let renderMovies,
    renderShows = '';

  renderMovies =
    movies.Response === 'True' ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>Sorry can't find that movie</h3>
      </div>
    );

  renderShows =
    shows.Response === 'True' ? (
      shows.Search.map((movie, index) => <MovieCard key={index} data={movie} />)
    ) : (
      <div className="shows-error">
        <h3>Sorry can't find that show</h3>
      </div>
    );

  useEffect(() => {
    return () => {
      dispatch(removeMovieOrShow());
    };
  }, []);

  return (
    <div className="movie-wrapper">
      <>
        <div className="movie-list">
          <h2>MOVIES</h2>
          {movies.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <div className="movie-container">
              <Slider {...Settings}>{renderMovies}</Slider>
            </div>
          )}
        </div>
        <div className="show-list">
          <h2>SHOWS</h2>
          {shows.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <div className="movie-container">
              <Slider {...Settings}>{renderShows}</Slider>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default MovieListing;
