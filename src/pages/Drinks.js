import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { cocktailThunk, cocktailCategoriesThunk } from '../actions/index.actions';

function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.cocktailReducer.cocktail.drinks);

  const buttonsNames = [
    'All',
    'Ordinary Drink',
    'Cocktail',
    'Milk / Float / Shake',
    'Cocoa',
    'Other/Unknown',
  ];

  useEffect(() => {
    const objToDispatch = { search: '', typeInput: 'Name' };

    dispatch(cocktailThunk(objToDispatch));
  }, [dispatch]);

  const handleClick = ({ target }) => {
    const { name } = target;

    // const objToDispatch = { search: name, typeInput: 'Ingredient' };
    console.log(name);
    console.log(drinks);

    dispatch(cocktailCategoriesThunk(name));
  };

  return (
    <div>
      <Header title="Drinks" visible />
      {
        buttonsNames.map((buttonName, index) => (
          <button
            key={ index }
            data-testid={ `${buttonName}-category-filter` }
            type="button"
            name={ buttonName }
            onClick={ handleClick }
          >
            {buttonName}
          </button>
        ))
      }
      {
        drinks && drinks.map((drink, index) => {
          const maxdrinks = 11;
          if (index > maxdrinks) return;
          return (
            <Cards
              key={ drink.strDrink }
              img={ drink.strDrinkThumb }
              index={ index }
              title={ drink.strDrink }
            />
          );
        })
      }
      <Footer />
    </div>
  );
}

export default Drinks;
