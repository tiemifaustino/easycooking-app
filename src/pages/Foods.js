import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { recipeThunk, recipeCategoriesThunk,
  ingredientFilter } from '../actions/index.actions';

function Foods() {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState({});
  // const [disabled, setDisabled] = useState(false);
  const foods = useSelector((state) => state.recipeReducer.recipe.meals);
  const { filter } = useSelector((state) => state.filterReducer);

  const buttonsNames = [
    'Beef',
    'Breakfast',
    'Chicken',
    'Dessert',
    'Goat',
  ];

  useEffect(() => {
    console.log(filter);
    return () => {
      dispatch(ingredientFilter(''));
    };
  }, []);

  useEffect(() => {
    const objToDispatch = { search: '', typeInput: 'Name' };

    dispatch(recipeThunk(objToDispatch));
  }, [dispatch]);

  const handleClick = ({ target }) => {
    const { name } = target;

    setClicked({
      [name]: !clicked[name],
    });

    if (clicked[name]) {
      const objToDispatch = { search: '', typeInput: 'Name' };

      dispatch(recipeThunk(objToDispatch));
    } else {
      dispatch(recipeCategoriesThunk(name));
    }
  };

  const handleClickToggle = () => {
    const obj = { search: '', typeInput: 'Name' };

    dispatch(recipeThunk(obj));
  };

  return (
    <div>
      <Header title="Foods" visible />
      <button type="reset" onClick={ handleClickToggle }>
        Reset
      </button>
      {
        buttonsNames.map((buttonName, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${buttonName}-category-filter` }
            name={ buttonName }
            onClick={ handleClick }
          >
            {buttonName}
          </button>
        ))
      }
      {
        foods && foods
          .filter((food) => Object.values(food).includes(filter))
          .map((meal, index) => {
            const maxFoods = 11;
            if (index > maxFoods) return;
            console.log(meal.strMeal);
            return (
              <Cards
                key={ index }
                img={ meal.strMealThumb }
                index={ index }
                title={ meal.strMeal }
              />
            );
          })
      }
      <Footer />
    </div>
  );
}

export default Foods;
