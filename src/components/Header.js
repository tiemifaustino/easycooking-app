import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { recipeThunk, cocktailThunk } from '../actions/index.actions';
import './Header.css';

function Header(props) {
  const { title, visible } = props;
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [clicked, setClicked] = useState(false);
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
    const obj = { search, typeInput };

    if (typeInput === 'First Letter' && search.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    setClicked(!clicked);

    if (window.location.href.includes('/foods')) {
      dispatch(recipeThunk(obj));
    } else if (window.location.href.includes('/drinks')) {
      dispatch(cocktailThunk(obj));
    }
  };

  useEffect(() => {
    const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';

    if (recipe.meals === null) {
      global.alert(ERROR_MESSAGE);
    }

    if (recipe.meals?.length === 1 && clicked) {
      history.push(`/foods/${recipe.meals[0].idMeal}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  useEffect(() => {
    const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';

    if (cocktail.drinks === null || cocktail === ERROR_MESSAGE) {
      global.alert(ERROR_MESSAGE);
    }

    if (cocktail.drinks?.length === 1 && clicked) {
      history.push(`/drinks/${cocktail.drinks[0].idDrink}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cocktail]);

  return (
    <header>
      <div className="d-flex justify-content-around p-2">
        <button
          type="button"
          onClick={ handleProfileClick }
          className="button-icon"
        >
          <img
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </button>

        <h1 data-testid="page-title" className="title">
          { title }
        </h1>

        {
          visible && (
            <button
              type="button"
              onClick={ showSearchBtn }
              className="button-icon"
            >
              <img
                src={ searchIcon }
                alt="searchIcon"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
      </div>

      {
        showInput && (
          <Form className="d-flex justify-content-center flex-column mx-4">
            <Form.Label htmlFor="search-input">
              <Form.Control
                type="text"
                placeholder="Search"
                data-testid="search-input"
                id="search-input"
                value={ search }
                onChange={ handleChangeSearch }
              />
            </Form.Label>

            <Form.Group className="d-flex justify-content-around mb-2">
              <Form.Label htmlFor="ingredient-search-radio" className="d-flex">
                <Form.Check
                  type="radio"
                  data-testid="ingredient-search-radio"
                  id="ingredient-search-radio"
                  name="typeInput"
                  value="Ingredient"
                  onChange={ handleChangeInput }
                />
                Ingredient
              </Form.Label>

              <Form.Label htmlFor="name-search-radio" className="d-flex">
                <Form.Check
                  type="radio"
                  data-testid="name-search-radio"
                  id="name-search-radio"
                  name="typeInput"
                  value="Name"
                  onChange={ handleChangeInput }
                />
                Name
              </Form.Label>

              <Form.Label htmlFor="first-letter-search-radio" className="d-flex">
                <Form.Check
                  type="radio"
                  data-testid="first-letter-search-radio"
                  id="first-letter-search-radio"
                  name="typeInput"
                  value="First Letter"
                  onChange={ handleChangeInput }
                />
                First Letter
              </Form.Label>
            </Form.Group>

            <Button
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleClickSearch }
              variant="danger"
              className="mx-5 mb-3"
            >
              Search
            </Button>
          </Form>
        )
      }

    </header>
  );
}

Header.propTypes = {
  title: string,
}.isRequired;

export default Header;
