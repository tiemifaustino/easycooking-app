import React, { useState } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, visible } = props;
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => {
    setShowInput(!showInput);
  };

  return (
    <header>
      <button type="button" onClick={ handleProfileClick }>
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">
        { title }
      </h1>
      {
        visible && (
          <button type="button" onClick={ handleSearchClick }>
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )
      }
      {
        showInput && (
          <input type="text" placeholder="Search" data-testid="search-input" />
        )
      }

    </header>
  );
}

Header.propTypes = {
  title: string,
}.isRequired;

export default Header;
