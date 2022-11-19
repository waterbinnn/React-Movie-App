import React from 'react';
import { useEffect } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import movieApi from '../../apis/movieApi';
import { APIKey } from '../../apis/MovieApiKey';
import { useDispatch } from 'react-redux';
import { addMovies } from '../../features/movies/movieSlice';

const Home = () => {
  const movieText = 'Harry';
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await movieApi
        .get(`/?apiKey=${APIKey}&s=${movieText}&type=movie`)
        .catch((err) => {
          console.error(err);
        });
      dispatch(addMovies(res.data));
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="banner-img"></div>
      <MovieListing />
    </>
  );
};

export default Home;
