import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { recipeThunk, cocktailThunk } from '../actions/index.actions';

function Header(props) {
  const { title, visible } = props;
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const { cocktail } = useSelector((state) => state.cocktailReducer);
  const { recipe } = useSelector((state) => state.recipeReducer);
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const showSearchBtn = () => {
    setShowInput(!showInput);
  };

  const handleChangeSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleChangeInput = ({ target: { value } }) => {
    setTypeInput(value);
  };

  const handleClickSearch = () => {
    const objToDispatch = { search, typeInput };
    if (typeInput === 'First Letter' && search.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (window.location.href.includes('/foods')) {
      dispatch(recipeThunk(objToDispatch));
    } else if (window.location.href.includes('/drinks')) {
      dispatch(cocktailThunk(objToDispatch));
    }
  };

  useEffect(() => {
    if (cocktail.drinks?.length === 1) {
      history.push(`/drinks/${cocktail.drinks[0].idDrink}`);
    }
  }, [cocktail]);

  useEffect(() => {
    if (recipe.meals?.length === 1) {
      history.push(`/foods/${recipe.meals[0].idMeal}`);
    }
  }, [recipe]);

  return (
    <header>
      <button
        type="button"
        onClick={ handleProfileClick }
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </button>

      <h1 data-testid="page-title">
        { title }
      </h1>

      {
        visible && (
          <button
            type="button"
            onClick={ showSearchBtn }
          >
            <img
              src={ searchIcon }
              alt="searchIcon"
              data-testid="search-top-btn"
            />
          </button>
        )
      }

      {
        showInput && (
          <form>
            <label htmlFor="search-input">
              <input
                type="text"
                placeholder="Search"
                data-testid="search-input"
                id="search-input"
                value={ search }
                onChange={ handleChangeSearch }
              />
            </label>

            <label htmlFor="ingredient-search-radio">
              <input
                type="radio"
                data-testid="ingredient-search-radio"
                id="ingredient-search-radio"
                name="typeInput"
                value="Ingredient"
                onChange={ handleChangeInput }
              />
              Ingredient
            </label>

            <label htmlFor="name-search-radio">
              <input
                type="radio"
                data-testid="name-search-radio"
                id="name-search-radio"
                name="typeInput"
                value="Name"
                onChange={ handleChangeInput }
              />
              Name
            </label>

            <label htmlFor="first-letter-search-radio">
              <input
                type="radio"
                data-testid="first-letter-search-radio"
                id="first-letter-search-radio"
                name="typeInput"
                value="First Letter"
                onChange={ handleChangeInput }
              />
              First Letter
            </label>

            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleClickSearch }
            >
              Search
            </button>
          </form>
        )
      }

    </header>
  );
}

Header.propTypes = {
  title: string,
}.isRequired;

export default Header;
