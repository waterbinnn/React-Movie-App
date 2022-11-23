import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MovieDetail from './components/MovieDetail/MovieDetail';
import MovieListing from './components/MovieListing/MovieListing';
import PageNotFound from './components/PageNotfound/PageNotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<MovieListing />} />
            <Route path="/movie/:imdbID" element={<MovieDetail />} />
            <Route element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
