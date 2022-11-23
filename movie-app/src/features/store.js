import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import movieReducer from './movies/movieSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  movies: movieReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    persistedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
