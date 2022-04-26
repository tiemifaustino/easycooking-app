import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <button type="button" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profileIcon" />
      </button>
      <h1 data-testid="page-title">
        Foods
      </h1>
      <button type="button" data-testid="search-top-btn">
        <img src={ searchIcon } alt="searchIcon" />
      </button>
    </header>
  );
}

export default Header;
