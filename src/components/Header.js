import React from 'react';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, visible } = props;
  return (
    <header>
      <button type="button">
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">
        { title }
      </h1>
      {
        visible && (
          <button type="button">
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )
      }

    </header>
  );
}

Header.propTypes = {
  title: string,
}.isRequired;

export default Header;
