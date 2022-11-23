import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  fetchAsyncMovies,
  fetchAsyncShows,
  searchTerm,
  removeSearchTerm,
} from '../../features/movies/movieSlice';

import user from '../../images/user.png';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const term = useSelector((state) => state.movies.term);

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === '') return alert('Please enter search term');
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    dispatch(removeSearchTerm());
    navigate(`/search?term=${term}`);
  };

  const handleChange = (e) => {
    dispatch(searchTerm(e.target.value));
  };

  return (
    <>
      <div className="header">
        <Link to="/">
          <div className="logo">FIND MOVIE APP</div>
        </Link>
        <div className="search-bar">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={term}
              placeholder="Search Movies or Shows"
              onChange={handleChange}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className="user-image">
          <img src={user} alt="user" />
        </div>
      </div>
    </>
  );
};

export default Header;
