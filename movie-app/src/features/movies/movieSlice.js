import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../apis/movieApi';
import { APIKey } from '../../apis/MovieApiKey';

const initialState = {
  movies: {},
  series: {},
};

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',

  async () => {
    const movieText = 'Harry';
    const res = await movieApi.get(
      `/?apiKey=${APIKey}&s=${movieText}&type=movie`
    );
    console.log(res);
    return res.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',

  async () => {
    const seriesText = 'Friends';
    const res = await movieApi.get(
      `/?apiKey=${APIKey}&s=${seriesText}&type=series`
    );
    console.log(res);
    return res.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, () => {
      console.log('Pending');
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
      console.log('Fetched');
      return { ...state, movies: payload };
    });
    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log('Rejected');
    });
    builder.addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
      console.log('Fetched');
      return { ...state, shows: payload };
    });
  },
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export default movieSlice.reducer;
