import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { cocktailThunk, cocktailCategoriesThunk,
  ingredientFilter } from '../actions/index.actions';

function Drinks() {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState({});
  const drinks = useSelector((state) => state.cocktailReducer.cocktail.drinks);
  const { filter } = useSelector((state) => state.filterReducer);

  const buttonsNames = [
    'All',
    'Ordinary Drink',
    'Cocktail',
    'Milk / Float / Shake',
    'Other/Unknown',
    'Cocoa',
  ];

  useEffect(() => () => {
    dispatch(ingredientFilter(''));
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  useEffect(() => {
    const objToDispatch = { search: '', typeInput: 'Name' };
    const objFilteredByIngredient = { search: filter, typeInput: 'Ingredient' };

    if (filter) {
      dispatch(cocktailThunk(objFilteredByIngredient));
    } else {
      dispatch(cocktailThunk(objToDispatch));
    }
  }, [dispatch]);

  const handleClick = ({ target }) => {
    const { name } = target;

    setClicked({
      [name]: !clicked[name],
    });

    if (clicked[name] || name === 'All') {
      const objToDispatch = { search: '', typeInput: 'Name' };

      dispatch(cocktailThunk(objToDispatch));
    } else {
      dispatch(cocktailCategoriesThunk(name));
    }
  };

  const handleClickToggle = () => {
    const obj = { search: '', typeInput: 'Name' };

    dispatch(cocktailThunk(obj));
  };

  return (
    <div className="container-page-drinks">
      <Header title="Drinks" visible />

      <div className="d-flex justify-content-center mt-2">
        <div className="d-flex justify-content-center flex-wrap">
          <Button
            type="reset"
            onClick={ handleClickToggle }
            variant="dark"
            size="sm"
            className="m-1"
          >
            Reset
          </Button>
          {
            buttonsNames.map((buttonName, index) => (
              <Button
                key={ index }
                data-testid={ `${buttonName}-category-filter` }
                type="button"
                name={ buttonName }
                onClick={ handleClick }
                variant="dark"
                size="sm"
                className="m-1"
              >
                {buttonName}
              </Button>
            ))
          }
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center container-cards">
        {
          drinks && drinks.map((drink, index) => {
            const maxdrinks = 11;
            if (index > maxdrinks) return;
            return (
              <Cards
                id={ drink.idDrink }
                key={ drink.strDrink }
                img={ drink.strDrinkThumb }
                index={ index }
                title={ drink.strDrink }
              />
            );
          })
        }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
