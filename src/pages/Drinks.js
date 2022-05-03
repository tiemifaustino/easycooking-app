import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { cocktailThunk, cocktailCategoriesThunk } from '../actions/index.actions';

function Drinks() {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState({});
  const drinks = useSelector((state) => state.cocktailReducer.cocktail.drinks);

  const buttonsNames = [
    'Ordinary Drink',
    'Cocktail',
    'Milk / Float / Shake',
    'Other/Unknown',
    'Cocoa',
  ];

  useEffect(() => {
    const objToDispatch = { search: '', typeInput: 'Name' };

    dispatch(cocktailThunk(objToDispatch));
  }, [dispatch]);

  const handleClick = ({ target }) => {
    const { name } = target;

    setClicked({
      [name]: !clicked[name],
    });

    if (clicked[name]) {
      const objToDispatch = { search: '', typeInput: 'Name' };

      dispatch(cocktailThunk(objToDispatch));
    } else {
      dispatch(cocktailCategoriesThunk(name));
    }

    console.log(name);
  };

  const handleClickToggle = () => {
    const obj = { search: '', typeInput: 'Name' };

    dispatch(cocktailThunk(obj));
  };

  return (
    <div>
      <Header title="Drinks" visible />
      <button type="reset" onClick={ handleClickToggle }>
        Reset
      </button>
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
