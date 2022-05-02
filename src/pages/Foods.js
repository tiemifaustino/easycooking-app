import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { recipeThunk, recipeCategoriesThunk } from '../actions/index.actions';

function Foods() {
  const dispatch = useDispatch();
  // const [food, setFood] = useState({});
  const foods = useSelector((state) => state.recipeReducer.recipe.meals);

  const buttonsNames = [
    'All',
    'Beef',
    'Breakfast',
    'Chicken',
    'Dessert',
    'Goat',
  ];

  useEffect(() => {
    const objToDispatch = { search: '', typeInput: 'Name' };

    dispatch(recipeThunk(objToDispatch));
    console.log('Use effect');
  }, [dispatch]);

  const handleClick = ({ target }) => {
    const { name } = target;

    // const objToDispatch = { search: name, typeInput: 'Ingredient' };
    console.log(name);
    console.log(foods);

    dispatch(recipeCategoriesThunk(name));
  };

  return (
    <div>
      <Header title="Foods" visible />
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
        foods && foods.map((meal, index) => {
          const maxFoods = 11;
          if (index > maxFoods) return;
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
